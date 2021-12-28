using Microsoft.AspNetCore.Mvc.WebApiCompatShim;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIS.Data;

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
      
        
    }
}
