using DalSql.models;
using DalSql.converters;
using Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DalSql
{
    public class ProductDal:IDal.Iproduct
    {
        private readonly PixoContext pixoDB;
        public ProductDal(PixoContext db)
        {
            pixoDB = db;
        }

           public IEnumerable<Dto.productDto> GetAllProducts()
        {
            var productList = pixoDB.Products.Include(p => p.Category).Include(p => p.Type).Include(p => p.Size).ToList();
            return converters.productConverters.ToDtoList(productList);
        }
    }
}
