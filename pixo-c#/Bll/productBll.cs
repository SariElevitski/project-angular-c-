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

        public async Task<IEnumerable<productDto>> GetAllProducts()
        {
            return await productD.GetAllProducts();
        }

    }
}
