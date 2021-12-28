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
    public class UserController : Controller
    {
        public AppDb Db { get; set; }

        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger, AppDb db)
        {
            _logger = logger;
            Db = db;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            List<User> list = new List<User>();
            try
            {
                var command = Db.Connection.CreateCommand();
                command.CommandText = "SELECT * FROM user";
                Db.Connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        string firstName = (string)reader["FirstName"];
                        string lastName = (string)reader["LastName"];
                        string userName = (string)reader["UserName"];
                        string password = (string)reader["Password"];
                        string role = (string)reader["Role"];
                        int id = (int)reader["ID"];
                        var user = new User { FirstName = firstName, LastName = lastName, UserName = userName, Password = password, Role = role, Id = id };
                        list.Add(user);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return list;
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
            try
            {
                var command = Db.Connection.CreateCommand();
                command.CommandText = String.Format("SELECT * FROM user WHERE  UserName = '{0}' and Password = '{1}'", Auth.UserName, Auth.Password);
                Db.Connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        string firstName = (string)reader["FirstName"];
                        string lastName = (string)reader["LastName"];
                        string userName = (string)reader["UserName"];
                        string password = (string)reader["Password"];
                        string role = (string)reader["Role"];
                        int id = (int)reader["ID"];
                        var user = new User { FirstName = firstName, LastName = lastName, UserName = userName, Password = password, Role = role, Id = id };
                        list.Add(user);
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
