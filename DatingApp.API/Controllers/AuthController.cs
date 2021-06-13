using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;


        public AuthController(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }


        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] UserForRegisterDto UserDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserDto.userName = UserDto.userName.ToLower();

            if (await _authRepository.UserExists(UserDto.userName))
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = new User
            {
                UserName = UserDto.userName
            };

            await _authRepository.Register(userToCreate, UserDto.password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserForLoginDto UserDto)
        {
            var userFromRep = await _authRepository.Login(UserDto.userName.ToLower(), UserDto.password);

            if (userFromRep == null)
            {
                return Unauthorized();
            }
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRep.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRep.UserName),

            };

            var section = _configuration.GetSection("AppSettings:Token").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(section));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds

            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}