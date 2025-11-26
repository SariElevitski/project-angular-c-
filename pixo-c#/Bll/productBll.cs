using Dto;

namespace Bll

{
    public class productBll : IBll.IproductBll
    {

        private readonly IDal.Iproduct productD;
        public productBll(IDal.Iproduct p)
        {
            productD = p;
        }

        public async Task<IEnumerable<productDto>> GetProducts(string? search, int? categoryId, decimal? minPrice, decimal? maxPrice)
        {
            return await productD.GetProducts(search,categoryId,minPrice,maxPrice);
        }

        public async Task<IEnumerable<productDto>> AddProducts(List<ProductCreateDto> dto)
        {
            return await productD.AddProducts(dto);   
        }


        public async Task<productDto?> GetById(int id)
        {
            return await productD.GetById(id);
        }





    }
}
