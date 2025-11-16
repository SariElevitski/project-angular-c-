using System;
using System.Collections.Generic;

namespace DalSql.models;

public partial class Size
{
    public int Id { get; set; }

    public string? SizeName { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
