using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.Data;
using DatingApp.Dtos;
using DatingApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController (IAuthRepository repo, IConfiguration config) {
            _config = config;
            _repo = repo;
        }

        [HttpPost ("login")]
        public async Task<IActionResult> login (UserForLoginDto userForLoginDto) {
            var userFromRepo = await _repo.Login (userForLoginDto.username.ToLower(), userForLoginDto.password);
            if (userFromRepo == null)
                return Unauthorized ();
            var claims = new [] {
                new Claim (ClaimTypes.NameIdentifier, userFromRepo.Id.ToString ()),
                new Claim (ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Tokens").Value));
            var cred=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

            var tokendescriptor=new SecurityTokenDescriptor{
                Subject=new ClaimsIdentity(claims),
                SigningCredentials=cred,
                Expires=DateTime.Now.AddDays(1)
            };
            var tokenHandler=new JwtSecurityTokenHandler();
            var token=tokenHandler.CreateToken(tokendescriptor);
            return Ok(new{
                token=tokenHandler.WriteToken(token)
            });

        }

        [HttpPost ("Register")]
        public async Task<IActionResult> Register (UserForRegisterDto userForRegisterDto) {

            userForRegisterDto.username = userForRegisterDto.username.ToLower ();
            if (await _repo.UserExists (userForRegisterDto.username))
                return BadRequest ("User Already Exists...");
            User UserToCreate = new User ();
            UserToCreate.Username = userForRegisterDto.username;

            await _repo.Register (UserToCreate, userForRegisterDto.password);
            return StatusCode (201);

        }
    }
}