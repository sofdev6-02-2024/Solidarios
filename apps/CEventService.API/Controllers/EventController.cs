using AutoMapper;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CEventService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventController : BaseController<Event, EventOutputDto, EventInputDto, int>
{
    public EventController(IMapper mapper, IEventService eventService)
        : base(mapper, eventService)
    {
    }

}