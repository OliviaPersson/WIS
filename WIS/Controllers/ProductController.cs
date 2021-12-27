using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WIS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        public AppDb Db { get; set; }

        private readonly ILogger<ProductController> _logger;

        public ProductController(ILogger<ProductController> logger, AppDb db)
        {
            _logger = logger;
            Db = db;
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            List<Product> list = new List<Product>();
            try
            {
                var command = Db.Connection.CreateCommand();
                command.CommandText = "SELECT * FROM products";
                Db.Connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        string productName = (string)reader["ProductName"];
                        string orderNumber = (string)reader["OrderNumber"];
                        int id = (int)reader["ID"];
                        int quantity = (int)reader["Quantity"];
                        var product = new Product { ProductName = productName, OrderNumber = orderNumber, Quantity = quantity, Id = id };
                        list.Add(product);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return list;
        }
    }
}
