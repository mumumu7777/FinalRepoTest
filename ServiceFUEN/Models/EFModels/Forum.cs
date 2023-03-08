using System;
using System.Collections.Generic;

namespace ServiceFUEN.Models.EFModels;

public partial class Forum
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string About { get; set; } = null!;

    public string CoverPhoto { get; set; } = null!;

    public virtual ICollection<Article> Articles { get; } = new List<Article>();
}
