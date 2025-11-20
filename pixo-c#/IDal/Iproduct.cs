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

        //void Add(productDto product);
        //productDto GetById(int id);
        IEnumerable<productDto> GetAllProducts();
        //void Update(productDto product);
        //void Delete(int id);





    }


}

