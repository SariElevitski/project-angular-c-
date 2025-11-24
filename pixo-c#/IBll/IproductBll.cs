using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IBll
{
    public interface IproductBll
    {

        Task<IEnumerable<Dto.productDto>> GetAllProducts();
    }
}
