using AutoMapper;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CEventService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegistrationController : BaseController<Registration, RegistrationOutputDto, RegistrationInputDto, int>
{
    private readonly IUserService _userService;
    private readonly IRegistrationService _registrationService;
    
    public RegistrationController(IMapper mapper, IRegistrationService registrationService, IUserService userService) : base(mapper, registrationService)
    {
        _registrationService = registrationService;
        _userService = userService;
    }

    [HttpPost]
    public override async Task<ActionResult<RegistrationOutputDto>> Create([FromBody] RegistrationInputDto inputDto)
    {
        var user = new User()
        {
            Name = inputDto.Name,
            LastName = inputDto.LastName,
            Email = inputDto.Email,
            PhoneNumber = inputDto.PhoneNumber
        };

        var createdUser = await _userService.CreateAsync(user);
        inputDto.UserId = createdUser.Id;
        return await base.Create(inputDto);
    }
}