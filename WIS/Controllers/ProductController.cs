﻿using Microsoft.AspNetCore.Mvc.WebApiCompatShim;
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
        public IActionResult OrderProducts(OrderProduct[] order)
        {

            List<Product> list = new List<Product>();
            Product product;
            try
            {
                list = this.myDbContext.Products.ToList();
                foreach (OrderProduct o in order)
                {
                    product = list.Find(product => product.Id.Equals(o.Id));
                    product.Quantity = o.OrderAmount + product.Quantity;
                    product.OrderAmount = 0;
                    product.OrderDate = DateTime.Now;
                    myDbContext.Update(product);
                    myDbContext.SaveChanges();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPost("AddProduct")]
        public IActionResult AddProduct(Product productEntities)
        {
            // Creates the database if not exists
            myDbContext.Database.EnsureCreated();

            if (productEntities == null) return BadRequest("Data empty");

            if (AnyByCode(productEntities.ProductCode))
            {
                return BadRequest("The specified product already exist");
            }
            else
            {
                try
                {
                    if (!ModelState.IsValid)
                        return BadRequest("Invalid data.");

                    myDbContext.Add(productEntities);
                    myDbContext.SaveChanges();
                    return Ok();

                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
        }
        public bool AnyByCode(string productCode)
        {
            return myDbContext.Products.Any(x => x.ProductCode == productCode);
        }
    }
}
