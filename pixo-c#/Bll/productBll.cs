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

        public IEnumerable<productDto> GetAllProducts()
        {
            return productD.GetAllProducts();
        }

    }
}
