using System;
using System.Collections.Generic;

namespace ServiceFUEN.Models.EFModels;

public partial class Article
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime Time { get; set; }

    public int MemberId { get; set; }

    public int ForumId { get; set; }

    public virtual ICollection<ArticlePhoto> ArticlePhotos { get; } = new List<ArticlePhoto>();

    public virtual Forum Forum { get; set; } = null!;

    public virtual Member Member { get; set; } = null!;

    public virtual ICollection<Message> Messages { get; } = new List<Message>();
}
