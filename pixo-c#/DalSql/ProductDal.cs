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
    public class ProductDal : IDal.Iproduct
    {
        private readonly PixoContext pixoDB;
        public ProductDal(PixoContext db)
        {
            pixoDB = db;
        }

        //   public async Task<IEnumerable<productDto>> GetProducts()
        //{
        //    var productList = pixoDB.Products.Include(p => p.Category).Include(p => p.Type).Include(p => p.Size).ToList();
        //    return await converters.productConverters.ToDtoList(productList);
        //}

        public async Task<IEnumerable<productDto>> GetProducts(
             string? search,
             int? categoryId,
             decimal? minPrice,
             decimal? maxPrice)
        {


            IQueryable<Product> query = pixoDB.Products
                                .Include(p => p.Category) // שמירת ה-Include-ים כדי לשלוף נתונים קשורים
                                .Include(p => p.Type)
                                .Include(p => p.Size)
                                .AsQueryable(); // AsQueryable() כדי לוודא שמתחילים כשאילתה

            // ב. בניית תנאי הסינון (Apply Filtering Logic)

            // סינון לפי מונח חיפוש
            if (!string.IsNullOrEmpty(search))
            {
                var lowerSearch = search.ToLower();
                // ה-Where נאגר כחלק מה-IQueryable ויתורגם ל-SQL LIKE
                query = query.Where(p =>
                    p.Name.ToLower().Contains(lowerSearch)
                );
            }

            // סינון לפי מזהה קטגוריה
            if (categoryId.HasValue && categoryId.Value > 0)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            // סינון לפי מחיר מינימלי
            if (minPrice.HasValue && minPrice.Value >= 0)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            // סינון לפי מחיר מקסימלי
            if (maxPrice.HasValue && maxPrice.Value >= 0)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            // ג. ביצוע השאילתה בבסיס הנתונים והשליפה הסופית
            // רק כאן Entity Framework מבצע את שאילתת SQL הכוללת את כל תנאי ה-WHERE
            var productList = await query.ToListAsync();

            // ד. המרה ל-DTO והחזרה
            return productConverters.ToDtoList(productList);
        }



        //post


        public async Task<IEnumerable<productDto>> AddProducts(List<ProductCreateDto> dtoList)
        {
            var models = productConverters.FromCreateDtoList(dtoList);

            pixoDB.Products.AddRange(models);
            await pixoDB.SaveChangesAsync();

            return productConverters.ToDtoList(models);
        }

        public async Task<productDto> GetById(int id)
        {

            var product = await pixoDB.Products.FirstOrDefaultAsync(p => p.Id == id); // תנאי לפי id

            if (product == null)
                return null;

            return productConverters.ToDto(product);
        }
    }


}

