using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto
{
    public class ProductCreateDto
    {
        public string? Name { get; set; }

        public string? ImageUrl { get; set; }

        public int CategoryId { get; set; }

        public int TypeId { get; set; }

        public int SizeId { get; set; }

        public decimal Price { get; set; }

    }
}
