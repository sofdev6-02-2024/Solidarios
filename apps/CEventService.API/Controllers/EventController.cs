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
    private readonly IEventService _eventService;
    public EventController(IMapper mapper, IEventService eventService)
        : base(mapper, eventService)
    {
        _eventService = eventService;
    }

    [HttpGet("summaryEvent")]
    public async Task<ActionResult<IEnumerable<EventHomePageDto>>> GetEventsForHomePage(
    [FromQuery] EventFilterDto filters,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 10)
    {
        var events = await _eventService.GetSummaryEvents(page, pageSize, filters);
        return Ok(events);
    }

}