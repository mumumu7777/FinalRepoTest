using System;
using System.Collections.Generic;

namespace ServiceFUEN.Models.EFModels;

public partial class ArticlePhoto
{
    public int Id { get; set; }

    public string Photo { get; set; } = null!;

    public int ArticleId { get; set; }

    public virtual Article Article { get; set; } = null!;
}
