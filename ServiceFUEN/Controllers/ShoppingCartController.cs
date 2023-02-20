using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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



		[HttpPost]
		//產品頁面點擊button加入購物車
		//會員id.產品id.number(數量)=1

		public IEnumerable<ShoppingCartVM> AddItemsToCart(int memberid, int productid, int number = 1)
		{

			var MembersCart = _context.ShoppingCarts.Select(x => x.MemberId ==memberid);

			var AddToCart = MembersCart.










		}




		
		/// <summary>
		/// 購物車東西
		/// </summary>
		/// <param name="MemberId"></param>
		/// <returns></returns>
		[HttpPost]
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
				Number= x.Number,
			}).Where(x=>x.MemberId==MemberId).ToList();


			





			return cartItems;







		}








	}


}
