using Microsoft.EntityFrameworkCore;
using DatingApp.Models;
namespace DatingApp.Data
{
    public class DataContext :DbContext
    {
     public DataContext(DbContextOptions<DataContext>options):base(options){}
     public DbSet<Value>Values{set;get;}
     public DbSet<User> Users{set;get;}
     
    }
}