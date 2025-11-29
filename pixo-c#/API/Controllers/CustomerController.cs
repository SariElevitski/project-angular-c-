using Bll;
using Dto;
using IBll;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private readonly ICustomerBll customerB;
        //נאתחל אותו בבנאי שמקבל מופע שלו בהזרקה
        public CustomerController(ICustomerBll c)
        {
            customerB = c;

        }

        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CustomerCreateDto dto)
        {
            await customerB.AddUser(dto);
            return Ok("המשתמש נוצר בהצלחה");
        }


    }
}
