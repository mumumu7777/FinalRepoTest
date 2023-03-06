﻿using System;
using System.Collections.Generic;

namespace ServiceFUEN.Models.EFModels;

public partial class View
{
    public int Id { get; set; }

    public int? PhotoId { get; set; }

    public int? MemberId { get; set; }

    public DateTime ViewDate { get; set; }

    public virtual Member? Member { get; set; }

    public virtual Photo? Photo { get; set; }
}
