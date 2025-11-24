using Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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
        public async Task<ActionResult<IEnumerable<productDto>>> Get(
            [FromQuery] string? search,
            [FromQuery] int? categoryId)
        {
            var products = await productB.GetAllProducts();
            var query = products.AsQueryable();
            //סינון לפי מונח חיפוש
            if (!string.IsNullOrEmpty(search))
            {
                var lowerSearch = search.ToLower();
                query = query.Where(p =>
                    p.Name.ToLower().Contains(lowerSearch)
                );
            }
            //סינון לפי מזהה קטגוריה
            if (categoryId.HasValue && categoryId.Value > 0)
            {
                // הניחו שיש למוצר שדה CategoryId מסוג int
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }


            return Ok(query.ToList());

            
        }
    }
}
