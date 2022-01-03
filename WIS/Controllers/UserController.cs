using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIS.Data;
using WIS.Data.Entities;

namespace WIS.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext myDbContext;

        public UserController(AppDbContext context)
        {
            myDbContext = context;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            try
            {
                return (this.myDbContext.Users.ToList());
            }
            catch (Exception ex)
            {
                return (IList<User>)BadRequest(ex);
            }
        }      

        [HttpPost("Authentication")]
        public IEnumerable<User> Authentication(UserAuthentication Auth)
        {
            List<User> list = new List<User>();
            List<User> AuthenticatedUser = new List<User>();
            try
            {
                list = this.myDbContext.Users.ToList();
                AuthenticatedUser.Add(list.Find(user => user.UserName.Equals(Auth.UserName) && user.Password.Equals(Auth.Password)));
                return AuthenticatedUser;
            }
            catch (Exception ex)
            {
                return (IEnumerable<User>)BadRequest(ex);
            }
        }
        [HttpPost("Registration")]
        public IActionResult Registration(User userEntities)
        {
            //var user = new User()
            //{
            //    FirstName = userEntities.FirstName,
            //    LastName = userEntities.LastName,
            //    UserName = userEntities.UserName,
            //    Password = userEntities.Password,
            //    Role = userEntities.Role
            //};


            List<User> list = new List<User>();
            list = this.myDbContext.Users.ToList();

            // Creates the database if not exists
            myDbContext.Database.EnsureCreated();

            if (userEntities == null) throw new ArgumentException("Data empty");

            if (AnyByName(userEntities.UserName))
            {
                return BadRequest("The username already exist");
            }
            else
            {
                try
                {
                    if (!ModelState.IsValid)
                        return BadRequest("Invalid data.");

                    myDbContext.Add(userEntities);
                    myDbContext.SaveChanges();
                    return Ok();

                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
        }
        public bool AnyByName(string name)
        {
            return myDbContext.Users.Any(x => x.UserName == name);
        }
        public User GetByName(string name)
        {
            return myDbContext.Users.Single(x => x.UserName.ToLower() == name.ToLower());
        }
    }
}
