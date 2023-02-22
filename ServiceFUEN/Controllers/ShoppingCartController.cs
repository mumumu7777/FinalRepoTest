using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceFUEN.Models.EFModels;
using ServiceFUEN.Models.ViewModels;
using System.Net;

namespace ServiceFUEN.Controllers
{

    [Route("api/[controller]")]
    [EnableCors("AllowAny")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {

        private readonly ProjectFUENContext _context;

        public ShoppingCartController(ProjectFUENContext context)
        {

            _context = context;

        }

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
            catch(Exception ex)
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

                    if (shoppingCartVM.CartProducts == null || shoppingCartVM.CartProducts.Length == 0)
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
                        Address = member.Address,
                        State = shoppingCartVM.State,
                    };

                    _context.OrderDetails.Add(orderDetail);
                    _context.SaveChanges();

                    // 抓已儲存主檔id
                    int orderDetailID = _context.OrderDetails
                        .Where(a =>
                            a.MemberId == orderDetail.MemberId &&
                            a.OrderDate == orderDetail.OrderDate &&
                            a.State == orderDetail.State
                        )
                        .Select(a => a.Id)
                        .FirstOrDefault();

                    if (orderDetailID == 0)
                    {
                        rtn.Code = (int)RetunCode.呼叫失敗;
                        rtn.Messsage = "未成功儲存ID";
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

                        // 找到商品加入訂單明細檔
                        orderItemList.Add(new OrderItem
                        {
                            OrderId = orderDetailID,
                            ProductId = product.Id,
                            ProductName = product.Name,
                            ProductPrice = product.Price,
                            ProductNumber = item.Qty
                        });

                    }

                    _context.OrderItems.AddRange(orderItemList);
                    _context.SaveChanges();
                    transaction.Commit();

                    rtn.Code = (int)RetunCode.呼叫成功;
                    rtn.Messsage = "儲存成功";

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


		[HttpPost("addToCart")]
        public async Task<IActionResult> addToCart([Bind(nameof(ShoppingCartVM))] ShoppingCartVM shoppingCartVM)
		{

            if (shoppingCartVM.CartProducts == null)
            {

            }


            return null;


		}


	}


}
