
using System.Threading.Tasks;
using DatingApp.Models;

namespace DatingApp.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string passowrd);
         Task<User> Login(string username, string passowrd);
         Task<bool> UserExists(string username);

    }
}