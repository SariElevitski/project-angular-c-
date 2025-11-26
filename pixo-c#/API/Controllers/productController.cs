using DalSql;
using DalSql.models;
using Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class productController : ControllerBase
    {

        private readonly IBll.IproductBll productB;
        //נאתחל אותו בבנאי שמקבל מופע שלו בהזרקה
        public productController(IBll.IproductBll p)
        {
            productB = p;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<productDto>>> Get(
            [FromQuery] string? search,
            [FromQuery] int? categoryId,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice)
        {

            var products = await productB.GetProducts(search, categoryId, minPrice, maxPrice);

            // 2. עוטפים את התוצאה ב-Ok() ומחזירים ללקוח
            return Ok(products);

        }

        [HttpPost("list")]
        public async Task<ActionResult<IEnumerable<productDto>>> AddProducts([FromBody] List<ProductCreateDto> list)
        {
            return Ok(await productB.AddProducts(list));
        }


        //ID מוצר לפי 
        [HttpGet("{id}")]
        public async Task<ActionResult<productDto>> GetProductById(int id)
        {
            var product = await productB.GetById(id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }
    }



}

