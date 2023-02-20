using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceFUEN.Models.EFModels;

namespace ServiceFUEN.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAny")]
    [ApiController]
    public class ShippingCartControllers : ControllerBase
    {
        private readonly ProjectFUENContext _context;

        public ShippingCartControllers(ProjectFUENContext context)
        {
            _context = context;
        }

        



    }


}
