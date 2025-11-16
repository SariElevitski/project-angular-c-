using System;
using System.Collections.Generic;

namespace DalSql.models;

public partial class Customization
{
    public int Id { get; set; }

    public int? ProductId { get; set; }

    public string? TextToPrint { get; set; }

    public string? ColorText { get; set; }

    public int? SizeText { get; set; }

    public string? FontName { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Product? Product { get; set; }
}
