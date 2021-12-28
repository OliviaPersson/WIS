using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WIS
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
