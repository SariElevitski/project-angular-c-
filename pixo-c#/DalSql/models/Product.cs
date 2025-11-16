using System;
using System.Collections.Generic;

namespace DalSql.models;

public partial class Product
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public decimal? Price { get; set; }

    public string? ImageUrl { get; set; }

    public int? CategoryId { get; set; }

    public int? SizeId { get; set; }

    public int? TypeId { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<Customization> Customizations { get; set; } = new List<Customization>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Size? Size { get; set; }

    public virtual Type? Type { get; set; }
}
