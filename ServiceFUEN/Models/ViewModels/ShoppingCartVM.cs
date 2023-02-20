using ServiceFUEN.Models.EFModels;

namespace ServiceFUEN.Models.ViewModels
{
	public class ShoppingCartVM
	{
		public int MemberId { get; set; }
		public int ProductId { get; set; }
		public int Number { get; set; }

		public virtual Member Member { get; set; }
		public virtual ProductDTO Product { get; set; }

	}
}
