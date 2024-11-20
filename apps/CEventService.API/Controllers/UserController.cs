using AutoMapper;
using CEventService.API.DTOs.User;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CEventService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : BaseController<User, UserOutputDto, UserInputDto, Guid>
{
    public UserController(IMapper mapper, IUserService userService)
        : base(mapper, userService)
    {
    }
}