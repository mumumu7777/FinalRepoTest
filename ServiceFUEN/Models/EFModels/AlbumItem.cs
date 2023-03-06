﻿using System;
using System.Collections.Generic;

namespace ServiceFUEN.Models.EFModels;

public partial class AlbumItem
{
    public int AlbumId { get; set; }

    public int PhotoId { get; set; }

    public DateTime AddTime { get; set; }

    public virtual Album Album { get; set; } = null!;

    public virtual Photo Photo { get; set; } = null!;
}
