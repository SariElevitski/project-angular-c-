namespace Dto
{
    public class productDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public decimal? Price { get; set; }

        public string? ImageUrl { get; set; }

        public int? CategoryId { get; set; }

        public string? CategoryName { get; set; }

        public int? SizeId { get; set; }

        public string? SizeName { get; set; }

        public int? TypeId { get; set; }

        public string? TypeName { get; set; }
    }
}
