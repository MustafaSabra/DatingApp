using System;
using System.Threading.Tasks;
using DatingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data {
    public class AuthRepository : IAuthRepository {
        
        private readonly DataContext _context;

        public AuthRepository (DataContext context) {
            this._context = context;

        }
        public async Task<User> Login (string username, string passowrd) {
             //throw new Exception("Nope");
            var user=await _context.Users.FirstOrDefaultAsync(m=>m.Username==username);
            if(user==null)
            return null;
            if(!VerifyPasswordHash(passowrd,user.PasswordHash,user.PasswordSalt))
            return null;
            return user;


        }

        private bool VerifyPasswordHash(string passowrd, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passowrd));
                for(int i=0;i<computedHash.Length;i++)
                {   
                    if(computedHash[i]!=passwordHash[i])
                    return false;
                }
                
            }
            return true;
        }

        public async Task<User> Register (User user, string password) {
            byte[]passwordHash,passwordSalt;
            CreatePasswordHash(password,out passwordHash,out passwordSalt);
            user.PasswordHash=passwordHash;
            user.PasswordSalt=passwordSalt;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512() )
          {
              passwordSalt=hmac.Key;
              passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

          }

        }

        public async Task<bool> UserExists (string username) {
            if(await _context.Users.AnyAsync(m=>m.Username==username))
            return true;
            return false;
        }
    }
}