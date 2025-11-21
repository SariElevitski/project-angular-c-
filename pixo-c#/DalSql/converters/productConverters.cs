using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DalSql.converters
{
    public class productConverters
    {
        public static Dto.productDto ToDto(models.Product  p)
        {
            Dto.productDto productD = new Dto.productDto();
            productD.Id = p.Id;
            productD.Name = p.Name;
            productD.Price = p.Price;
            productD.ImageUrl = p.ImageUrl;
            productD.CategoryId = p.CategoryId;
            productD.SizeId = p.SizeId;
            productD.TypeId = p.TypeId;

           

             productD.CategoryName = p.Category != null ? p.Category.Name : "";

            //return productD;

            productD.SizeName = p.Size != null ? p.Size.SizeName : "";

            //return productD;

            productD.TypeName = p.Type != null ? p.Type.Name : "";

            return productD;

        }

        public static List<Dto.productDto> ToDtoList(List<models.Product> lp)
        {
            List<Dto.productDto> lpnew = new List<Dto.productDto>();
            foreach (var item in lp)
            {
                lpnew.Add(ToDto(item));
            }
            return lpnew;
        }


    }
}
