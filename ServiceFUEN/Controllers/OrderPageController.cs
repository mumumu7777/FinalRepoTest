using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ServiceFUEN.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAny")]
    [ApiController]
    public class OrderPageController : ControllerBase
    {
    }
}
