using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dto;



namespace DalSql.converters
{
    public class productConverters
    {
        public static productDto ToDto(models.Product  p)
        {
            productDto productD = new productDto();
            productD.Id = p.Id;
            productD.Name = p.Name;
            productD.Price = p.Price;
            productD.ImageUrl = p.ImageUrl;
            productD.CategoryId = p.CategoryId;
            productD.SizeId = p.SizeId;
            productD.TypeId = p.TypeId;
            productD.CategoryName = p.Category != null ? p.Category.Name : "";
            productD.SizeName = p.Size != null ? p.Size.SizeName : "";
            productD.TypeName = p.Type != null ? p.Type.Name : "";

            return productD;

        }

        public static  List<productDto> ToDtoList(List<models.Product> lp)
        {
            List<productDto> lpnew = new List<productDto>();
            foreach (var item in lp)
            {
                lpnew.Add(ToDto(item));
            }
            return lpnew;
        }

        public static models.Product FromCreateDto(ProductCreateDto dto)
        {
            return new models.Product
            {
                Name = dto.Name,
                Price = dto.Price,
                ImageUrl = dto.ImageUrl,
                CategoryId = dto.CategoryId,
                SizeId = dto.SizeId,
                TypeId = dto.TypeId
            };
        }


        public static List<models.Product> FromCreateDtoList(List<ProductCreateDto> ldto)
        {
            return ldto.Select(FromCreateDto).ToList();
        }



    }
}
