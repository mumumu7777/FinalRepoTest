using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceFUEN.Models.EFModels;
using ServiceFUEN.Models.ViewModels;

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


       
        [HttpPost("AddItemsToCart")]
        [AllowAnonymous]
        public async Task <IActionResult>AddItemsToCart([Bind(nameof(ShoppingCartVM))] ShoppingCartVM shoppingCartVM)
        {


            if (shoppingCartVM == null)
            {
                return BadRequest();
            }
            //找出購物車            
            _context.Add(shoppingCartVM);
            await _context.SaveChangesAsync();
                                                               
            return null ;

        }





        /// <summary>
        /// 購物車東西
        /// </summary>
        /// <param name="MemberId"></param>
        /// <returns></returns>
        [HttpPost("ShippingCartItems")]
        public IEnumerable<ShoppingCartVM> ShippingCartItems(int MemberId)
        {
            var shoppingCart = _context.ShoppingCarts;

           
            //加減購物車商品
            //勾選購物車商品
            //抓出會員的
            //購物車最終商品
            var cartItems = shoppingCart.Select(x => new ShoppingCartVM
            {
                MemberId = x.MemberId,
                ProductId = x.ProductId,
                Number = x.Number,
            }).Where(x => x.MemberId == MemberId).ToList();

            if (cartItems == null)
            {
                //return Problem("das") ;
                return null;
            }

            return cartItems;
        }

        //[HttpPut("updateCartAmount")]






    }


}
