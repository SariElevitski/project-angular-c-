using Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class productController : ControllerBase
    {

        private readonly IBll.IproductBll  productB;
        //נאתחל אותו בבנאי שמקבל מופע שלו בהזרקה
        public productController(IBll.IproductBll p)
        {
            productB = p;

        }
        [HttpGet]
        public IEnumerable<productDto> Get()
        {
            return productB.GetAllProducts();
        }


    }
}
