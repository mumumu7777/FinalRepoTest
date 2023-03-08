using System;
using System.Collections.Generic;

namespace ServiceFUEN.Models.EFModels;

public partial class Administrator
{
    public string Account { get; set; } = null!;

    public string? Password { get; set; }

    public DateTime CreateTime { get; set; }
}
