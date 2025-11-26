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
        Task<IEnumerable<productDto>> GetProducts(string? search,int? categoryId,decimal? minPrice,decimal? maxPrice);

        Task<IEnumerable<productDto>> AddProducts(List<ProductCreateDto> dto);

        Task<productDto> GetById(int id);
    }


}

