using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthRepository _authRepository;
        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }


        [HttpPost("register")]
        public async Task<ActionResult<StatusCodeResult>> Register([FromBody] UserForRegisterDto UserDto)
        {

            // Validate request
            if (await _authRepository.UserExists(UserDto.userName.ToLower()))
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = new User
            {
                UserName = UserDto.userName
            };

            var createdUser = await _authRepository.Register(userToCreate, UserDto.password);

            return StatusCode(201);
        }

    }
}