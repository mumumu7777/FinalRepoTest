using System;
using System.Collections.Generic;

namespace ServiceFUEN.Models.EFModels;

public partial class Message
{
    public int Id { get; set; }

    public string Content { get; set; } = null!;

    public DateTime Time { get; set; }

    public int MemberId { get; set; }

    public int ArticleId { get; set; }

    public virtual Article Article { get; set; } = null!;

    public virtual Member Member { get; set; } = null!;
}
