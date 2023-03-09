﻿using FluentEcpay;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceFUEN.Models.EFModels;
using ServiceFUEN.Models.ViewModels;
using System.Diagnostics.Metrics;
using System.Net;

namespace ServiceFUEN.Controllers
{

    [Route("api/[controller]")]
    [EnableCors("AllowAny")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {

        private readonly ProjectFUENContext _context;
        private readonly IConfiguration _configuration;


        #region 綠界支付參數
        private readonly string ECPayServiceURL;
        private readonly string ECPayHashKey;
        private readonly string ECPayHashIV;
        private readonly string ECPayMerchantID;

        private readonly string ECPayHomeURL;
        private readonly string ECPayReturnURL;
        private readonly string ECPayClientBackURL;
        private readonly string ECPayOrderResultURL;
        #endregion

        public ShoppingCartController(ProjectFUENContext context, IConfiguration configuration)
        {

            _context = context;
            _configuration = configuration;

            //  讀取設定檔 (開發與生產環境相同)
            ECPayServiceURL = _configuration["ECPay:ECPayServiceURL"] ?? "";
            ECPayHashKey = _configuration["ECPay:ECPayHashKey"] ?? "";
            ECPayHashIV = _configuration["ECPay:ECPayHashIV"] ?? "";
            ECPayMerchantID = _configuration["ECPay:ECPayMerchantID"] ?? "";

            // 讀取設定檔 (開發與生產環境url會不同 所以分別存)
#if DEBUG
            ECPayHomeURL = _configuration["ECPay:ECPayHomeURL_Dev"] ?? "";
            ECPayReturnURL = _configuration["ECPay:ECPayReturnURL_Dev"] ?? "";
            ECPayClientBackURL = _configuration["ECPay:ECPayClientBackURL_Dev"] ?? "";
            ECPayOrderResultURL = _configuration["ECPay:ECPayOrderResultURL_Dev"] ?? "";
#else
                        ECPayHomeURL = _configuration["ECPay:ECPayHomeURL_Prod"] ?? "";
                        ECPayReturnURL = _configuration["ECPay:ECPayReturnURL__Prod"] ?? "";
                        ECPayClientBackURL = _configuration["ECPay:ECPayClientBackURL_Prod"] ?? "";
                        ECPayOrderResultURL = _configuration["ECPay:ECPayOrderResultURL_Prod"] ?? "";
#endif
        }

        //discount
        //加入以使用折價
        [HttpGet("CatchCoupon")]
        [AllowAnonymous]
        public async Task<IActionResult> CatchCoupon(string CouponCode)
        {
            ReturnVM rtn = new ReturnVM();


            var selectedCoup = _context.Coupons.Where(x => x.Code == CouponCode).FirstOrDefault();
           

            if (selectedCoup == null || selectedCoup.Count == 0)
            {
                rtn.Messsage = "無效折價券";
                rtn.Code = (int)RetunCode.呼叫失敗;
                return BadRequest(rtn);
            }
            
            //do or not 驗證是否用過
            
         
            rtn.Code = (int)RetunCode.呼叫成功;
            rtn.Messsage = "成功使用折價券";
            rtn.Data = selectedCoup;

            return Ok(rtn);

        }

        //抓商品
        [HttpGet("GetProducts")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProducts()
        {
            ReturnVM rtn = new ReturnVM();
            try
            {
                var product = _context.Products.ToList();

                rtn.Code = (int)RetunCode.呼叫成功;
                rtn.Messsage = "成功取得商品";
                rtn.Data = product;

                return Ok(rtn);
            }
            catch (Exception ex)
            {
                rtn.Code = (int)RetunCode.呼叫失敗;
                rtn.Messsage = "其他錯誤";
                return BadRequest(rtn);
            }

        }

        /// <summary>
        /// 接收購物車內容、算錢、存DB
        /// </summary>
        /// <param name="shoppingCartVM"></param>
        [HttpPost("SaveShoppingCart")]
        [AllowAnonymous]
        public async Task<IActionResult> SaveShoppingCart([Bind(nameof(ShoppingCartVM))] ShoppingCartVM shoppingCartVM)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                ReturnVM rtn = new ReturnVM();
                try
                {
                    // 商品(明細檔)
                    List<OrderItem> orderItemList = new List<OrderItem>();

                    // 是否有此會員
                    Member? member = _context.Members.Where(a => a.Id == shoppingCartVM.MemberId).FirstOrDefault();

                    if (member == null)
                    {
                        rtn.Code = (int)RetunCode.呼叫失敗;
                        rtn.Messsage = "無此會員";
                        return BadRequest(rtn);
                    }


                    if (shoppingCartVM.CartProducts.Length == 0)
                    {
                        rtn.Code = (int)RetunCode.呼叫失敗;
                        rtn.Messsage = "購物車無商品";
                        return BadRequest(rtn);
                    }


                    // 存主檔
                    OrderDetail orderDetail = new OrderDetail()
                    {
                        MemberId = member.Id,
                        // 因為Azure伺服器在美國 所以要以美國時間 +8hr
                        OrderDate = DateTime.UtcNow.AddHours(08),
                        Address = shoppingCartVM.Adress.ZipCode+" "+ shoppingCartVM.Adress.CountyName + shoppingCartVM.Adress.Name+ shoppingCartVM.Adress.InputRegion,
                        State = shoppingCartVM.State,
                        UsedCoupon=shoppingCartVM.CouponData.UsedCouponID,
                        PaymentId="FEWFDASFG",
                        Total= shoppingCartVM.Total,


                    };

                    _context.OrderDetails.Add(orderDetail);
                    _context.SaveChanges();

                    // 抓已儲存訂單主檔
                    var orderDetailSaved = _context.OrderDetails
                        .Where(a =>
                            a.MemberId == orderDetail.MemberId &&
                            a.OrderDate == orderDetail.OrderDate &&
                            a.State == orderDetail.State
                        )
                        .FirstOrDefault();

                    if (orderDetailSaved == null)
                    {
                        rtn.Code = (int)RetunCode.呼叫失敗;
                        rtn.Messsage = "未成功儲存訂單";
                        transaction.Rollback();
                        return BadRequest(rtn);
                    }

                    foreach (var item in shoppingCartVM.CartProducts)
                    {
                        var product = _context.Products.Where(a => a.Id == item.Id).FirstOrDefault();

                        if (product == null)
                        {
                            rtn.Code = (int)RetunCode.呼叫失敗;
                            rtn.Messsage = "購物車商品不存在";
                            return BadRequest(rtn);
                        }

                        // 找到商品加入訂單明細檔--
                        orderItemList.Add(new OrderItem
                        {
                            OrderId = orderDetailSaved.Id,
                            ProductId = product.Id,
                            ProductName = product.Name,
                            ProductPrice = product.Price,
                            ProductNumber = item.Qty
                        });

                    }

                    //總金額 //原始金額
                    int toatal = orderItemList.Sum(a => a.ProductPrice * a.ProductNumber);
                    //使用的折價卷
                    var UsingCoupon = _context.Coupons.Where(x => x.Code == shoppingCartVM.CouponData.CouponCode).FirstOrDefault();

                   

                    // if 有折...  => 防呆 => 正確 => toatal*乘數
                    if (shoppingCartVM.CouponData.UsedCouponID != null )
                    {
						// 折價券最低消費 ........
						if (UsingCoupon.LeastCost < toatal)
						{
							try
							{
								//驗證前端折價券金額是否異常,如果正常就扣錢
								if (UsingCoupon.Discount == shoppingCartVM.CouponData.Discount)
								{
									//折價大於一減多少錢,小於一用乘的打折 //int to decimai 
									toatal = (UsingCoupon.Discount > 1) ? toatal - Convert.ToInt32(UsingCoupon.Discount) : Convert.ToInt32(Convert.ToDecimal(toatal) * UsingCoupon.Discount);
								}

							}
							catch
							{
								rtn.Code = (int)RetunCode.呼叫失敗;
								rtn.Messsage = "折價券金額異常";
								transaction.Rollback();
								return BadRequest(rtn);

							};
						}

						else
						{
							rtn.Code = (int)RetunCode.呼叫失敗;
							rtn.Messsage = "總金額低於折價券最低消費金額";
							return BadRequest(rtn);
						}

					}

                    //驗證折扣後金額是否正確
                    if (toatal != shoppingCartVM.Total) {
                        rtn.Code = (int)RetunCode.呼叫失敗;
                        rtn.Messsage = "金額異常";
                        transaction.Rollback();
                        return BadRequest(rtn);
                    }
                                                 
                      _context.OrderItems.AddRange(orderItemList);
                    _context.SaveChanges();

                    // 抓出已儲存訂單明細檔
                    var orderItemSaved = _context.OrderItems.Where(a => a.OrderId == orderDetailSaved.Id).ToList();

                    // 將商品存入付款資訊
                    List<Item> payItems = new List<Item>();

                    foreach (var item in orderItemSaved)
                    {
                        payItems.Add(new Item
                        {
                            Name = item.ProductName,
                            Price = item.ProductPrice,
                            Quantity = item.ProductNumber
                        });
                    }


                    // 綠界金流官網只有提供.net framwork版dll 但是使用的話跨平台會有問題
                    // 參數意思可關註解並大致參考:
                    // Demo/ECPay_bak.cs (.net framwork版用法)

                    // 目前使用函式庫: FluentEcpay (.net core可用不需引入dll)

                    // 將訂單加入後資料庫後 取得付款資訊傳回前端
                    var service = new
                    {
                        Url = ECPayServiceURL,
                        MerchantId = ECPayMerchantID,
                        HashKey = ECPayHashKey,
                        HashIV = ECPayHashIV,
                        ServerUrl = $"{ECPayHomeURL}/api/ShoppingCart/CallBack",
                        ClientUrl = ECPayOrderResultURL
                    };

                    var payInfo = new
                    {
                        No = "ServiceFUEN", // 訂單編號前綴
                        Description = "測試購物系統",
                        Date = DateTime.Now,
                        Method = EPaymentMethod.Credit,
                        Items = payItems
                    };

                    // 將必要參數傳入 最後會產生與綠界付款相符的付款類別
                    // 裡面有付款的id 資料庫要存才能依付款id 使用CallBack找到這筆
                    IPayment payment = new PaymentConfiguration()
                        .Send.ToApi(
                            url: service.Url)
                        .Send.ToMerchant(
                            service.MerchantId)
                        .Send.UsingHash(
                            key: service.HashKey,
                            iv: service.HashIV)
                        .Return.ToServer(
                            url: service.ServerUrl)
                        .Return.ToClient(
                            url: service.ClientUrl)
                        .Transaction.New(
                            no: payInfo.No,
                            description: payInfo.Description,
                            date: payInfo.Date)
                        .Transaction.UseMethod(
                            method: payInfo.Method)
                        .Transaction.WithItems( // 這邊加入算好折扣的金額amount 如果是null(預設)系統會用原價
                            items: payInfo.Items,
                            amount: toatal)
                        .Generate();

                    transaction.Commit();

                    rtn.Data = new
                    {
                        formData = payment, // 前端需要的付款資料
                    };
                    rtn.Code = (int)RetunCode.呼叫成功;
                    rtn.Messsage = "訂單已儲存，前往付款頁面";

                    return Ok(rtn);
                }
                catch (Exception ex)
                {
                    rtn.Code = (int)RetunCode.呼叫失敗;
                    rtn.Messsage = "其他錯誤";
                    transaction.Rollback();
                    return BadRequest(rtn);
                }
            }
        }

        [HttpPost("CallBack")]
        public IActionResult Callback(PaymentResult result)
        {


            // 務必判斷檢查碼是否正確。
            if (!CheckMac.PaymentResultIsValid(result, ECPayHashKey, ECPayHashIV)) return BadRequest();

            // 處理後續訂單狀態的更動等等...。

            return Ok("1|OK");
        }


        #region 購物車改localStorage儲存 以下為每按一下 就寫DB舊寫法
        //抓取使用者購物車
        //[HttpGet("GetUserCart")]
        //[AllowAnonymous]
        //public async Task<IActionResult> GetUserCart(int userId)
        //{
        //    ReturnVM rtn = new ReturnVM();
        //    try
        //    {
        //        var product = _context.Products.ToList();

        //        // 查詢此id所有購物車資料
        //        var shoppingCart = _context.ShoppingCarts
        //            .Where(a => a.MemberId == userId)
        //            .Include(a => a.Product)
        //            .Select(a => new CartProduct
        //            {
        //                Id = a.ProductId,
        //                Qty = a.Number,
        //                Name = a.Product.Name,
        //            })
        //            .ToList();


        //        rtn.Code = (int)RetunCode.呼叫成功;
        //        rtn.Messsage = "成功取得商品";
        //        rtn.Data = shoppingCart;

        //        return Ok(rtn);
        //    }
        //    catch (Exception ex)
        //    {
        //        rtn.Code = (int)RetunCode.呼叫失敗;
        //        rtn.Messsage = "其他錯誤";
        //        return BadRequest(rtn);
        //    }

        //}

        /// <summary>
        /// 加入購物車
        /// </summary>
        /// <param name="cartProduct"></param>
        /// <param name="memberID"></param>
        /// <param name="mode">0: 增加 1: 減少 2: 指定數量</param>
        /// <returns></returns>
        //[HttpPost("AddToCart/{memberID}/{mode}")]
        //public async Task<IActionResult> AddToCart([Bind(nameof(CartProduct))] CartProduct cartProduct, int memberID, int mode)
        //{

        //    ReturnVM rtn = new ReturnVM();

        //    using (var transaction = _context.Database.BeginTransaction())
        //    {

        //        try
        //        {
        //            List<int> modes = new List<int>() { 0, 1, 2 };

        //            if (!modes.Contains(mode))
        //            {
        //                rtn.Code = (int)RetunCode.呼叫失敗;
        //                rtn.Messsage = "無此購物車計算方法";
        //                return BadRequest(rtn);
        //            }

        //            if (cartProduct.Qty < 1)
        //            {
        //                rtn.Code = (int)RetunCode.呼叫失敗;
        //                rtn.Messsage = "商品數量不得為0";
        //                return BadRequest(rtn);
        //            }

        //            // 是否有此會員
        //            Member? member = _context.Members.Where(a => a.Id == memberID).FirstOrDefault();

        //            if (member == null)
        //            {
        //                rtn.Code = (int)RetunCode.呼叫失敗;
        //                rtn.Messsage = "無此會員";
        //                return BadRequest(rtn);
        //            }

        //            // 是否有此產品
        //            Product? product = _context.Products.Where(a => a.Id == cartProduct.Id).FirstOrDefault();

        //            if (product == null)
        //            {
        //                rtn.Code = (int)RetunCode.呼叫失敗;
        //                rtn.Messsage = "無此商品";
        //                return BadRequest(rtn);
        //            }


        //            // 查詢購物車table是否有此商品
        //            ShoppingCart? shoppingCart = _context.ShoppingCarts
        //                .Where(a => a.MemberId == member.Id && a.ProductId == cartProduct.Id)
        //                .FirstOrDefault();

        //            if (shoppingCart == null && (mode == 0 || mode == 2))
        //            {
        //                // 購物車不存在此商品 加一筆

        //                // mode 0 數量+1 否則加傳入數量
        //                int addQty = mode == 0 ? 1 : cartProduct.Qty;

        //                // 沒有寫一筆
        //                _context.ShoppingCarts.Add(new ShoppingCart()
        //                {
        //                    MemberId = member.Id,
        //                    ProductId = product.Id,
        //                    Number = addQty,
        //                });
        //            }
        //            else
        //            {
        //                // 購物車存在此商品 更新此筆
        //                shoppingCart.MemberId = member.Id;
        //                shoppingCart.ProductId = product.Id;

        //                switch (mode)
        //                {
        //                    case 0:
        //                        shoppingCart.Number++;
        //                        break;
        //                    case 1:
        //                        shoppingCart.Number--;
        //                        break;
        //                    case 2:
        //                        shoppingCart.Number = cartProduct.Qty;
        //                        break;
        //                }

        //                _context.ShoppingCarts.Update(shoppingCart);

        //            }




        //            // 查詢此id所有購物車資料
        //            var cartUpdated = _context.ShoppingCarts
        //                .Where(a => a.MemberId == member.Id)
        //                .Include(a => a.Product)
        //                .Select(a => new CartProduct
        //                {
        //                    Id = a.ProductId,
        //                    Qty = a.Number,
        //                    Name = a.Product.Name,
        //                })
        //                .ToList();

        //            rtn.Data = cartUpdated;

        //            _context.SaveChanges();
        //            transaction.Commit();



        //            rtn.Code = (int)RetunCode.呼叫成功;
        //            rtn.Messsage = "加入成功";
        //            return Ok(rtn);
        //        }
        //        catch (Exception ex)
        //        {
        //            rtn.Code = (int)RetunCode.呼叫失敗;
        //            rtn.Messsage = "其他錯誤";
        //            transaction.Rollback();
        //            return BadRequest(rtn);
        //        }

        //    }

        //}


        ////刪除購物車商品

        //[HttpDelete("DeleteCartItem")]
        //public async Task<IActionResult> DeleteCartItem([Bind(nameof(CartProduct))] CartProduct item, int memberid)
        //{
        //    ReturnVM rtn = new ReturnVM();

        //    try
        //    {

        //        //找到該購物車商品
        //        var CartItem = _context.ShoppingCarts
        //            .Where(x => x.ProductId == item.Id && x.MemberId == memberid)
        //            .FirstOrDefault();

        //        if (CartItem == null)
        //        {
        //            rtn.Code = (int)RetunCode.呼叫失敗;
        //            rtn.Messsage = "查無此商品";
        //            return BadRequest(rtn);
        //        }

        //        _context.ShoppingCarts.Remove(CartItem);
        //        _context.SaveChanges();

        //        // 查詢此id所有購物車資料
        //        var CartData = _context.ShoppingCarts
        //            .Where(a => a.MemberId == memberid)
        //            .Include(a => a.Product)
        //            .Select(a => new CartProduct
        //            {
        //                Id = a.ProductId,
        //                Qty = a.Number,
        //                Name = a.Product.Name,
        //            })
        //            .ToList();


        //        rtn.Code = (int)RetunCode.呼叫成功;
        //        rtn.Messsage = "刪除成功";
        //        rtn.Data = CartData;

        //        return Ok(rtn);

        //    }
        //    catch (Exception ex)
        //    {
        //        rtn.Code = (int)RetunCode.呼叫失敗;
        //        rtn.Messsage = "其他錯誤";
        //        return BadRequest(rtn);
        //    }

        //}
        #endregion
    }


}
