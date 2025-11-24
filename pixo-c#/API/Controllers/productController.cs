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

        private readonly IBll.IproductBll  productB;
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
            //סינון לפי מחיר מינימלי
            if (minPrice.HasValue && minPrice.Value >= 0)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }


            // סינון לפי מחיר מקסימלי
            if (maxPrice.HasValue && maxPrice.Value >= 0)
            {
                // סינון מוצרים שקטנים או שווים למחיר המקסימלי
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            return Ok(query.ToList());

            
        }
    }

    // את כל זה צריך להעביר לDAL לבדוק מה אפרת אמרה  ⬆️⬆️⬆️⬆️⬆️



    //   להוסיף פה פונקציה של עדכון  כדי להוסיף נתונים לטבלה - מוצרים POST
    //בGET לפי השכבות כמו שעשינו 
}
