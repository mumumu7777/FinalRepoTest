﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ServiceFUEN.Models.EFModels
{
    public partial class Category
    {
        public Category()
        {
            Products = new HashSet<ProductDTO>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ProductDTO> Products { get; set; }
    }
}