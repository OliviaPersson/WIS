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

        public class UserAuthentication
        {
            public string UserName { get; set; }
            public string Password { get; set; }
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
    }
}
