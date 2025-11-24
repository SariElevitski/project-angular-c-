using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dto;


namespace IDal
{
    public interface Iproduct
    {   
        Task<IEnumerable<productDto>> GetAllProducts();
    }


}

