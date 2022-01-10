using Microsoft.AspNetCore.Mvc.WebApiCompatShim;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIS.Data;
using System.Collections;
using WIS.Data.Entities;

namespace WIS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext myDbContext;


        public ProductController(AppDbContext context)
        {
            myDbContext = context;
        }

        [HttpGet]
        public IList<Product> Get()
        {
            try
            {
                return (this.myDbContext.Products.ToList());
            }
            catch (Exception ex)
            {
                return (IList<Product>)BadRequest(ex);
            }

        }

        [HttpPost("Order")]
        public IActionResult OrderProducts(OrderProduct order)
        {
            List<Product> list = new List<Product>();
            try
            {
                list = this.myDbContext.Products.ToList();
                Product product = list.Find(product => product.Id.Equals(order.Id));
                product.OrderAmount = order.OrderAmount;
                myDbContext.Update(product);
                myDbContext.SaveChanges();
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }
    }
}
