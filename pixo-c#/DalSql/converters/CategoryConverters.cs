using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dto;

namespace DalSql.converters
{
    public class CategoryConverters
    {
        public static CategoryDto ToDto(models.Category c)
        {
            CategoryDto CategoryD = new CategoryDto();
            CategoryD.Id = c.Id;
            CategoryD.Name = c.Name;

            return CategoryD;

        }
    }
}
