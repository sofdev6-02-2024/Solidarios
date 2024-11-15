using AutoMapper;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CEventService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;
    private readonly IMapper _mapper;

    public EventController(IEventService eventService, IMapper mapper)
    {
        _eventService = eventService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EventOutputDto>>> GetAllEvents([FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var events = await _eventService.GetAllAsync(page, pageSize);
        if (events.IsNullOrEmpty()) return NotFound();

        var eventsDto = _mapper.Map<EventOutputDto>(events);
        return Ok(eventsDto);
    }

    [HttpGet("homepage")]
    public async Task<ActionResult<IEnumerable<EventHomePageDto>>> GetEventsForHomePage([FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var events = await _eventService.GetAllAsync(page, pageSize);
        if (events.IsNullOrEmpty()) return NotFound();

        var eventsDto = _mapper.Map<EventHomePageDto>(events);
        return Ok(eventsDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEventById(int id)
    {
        var foundEvent = await _eventService.GetByIdAsync(id);
        return ValidateNotNullResponse(_mapper.Map<EventOutputDto>(foundEvent));
    }


    [HttpPost]
    public async Task<ActionResult<EventOutputDto>> CreateEvent([FromBody] EventInputDto newEventDto)
    {
        var newEvent = _mapper.Map<Event>(newEventDto);
        var eventCreated = await _eventService.CreateAsync(newEvent);
        return eventCreated == null
            ? BadRequest()
            : CreatedAtAction(nameof(GetEventById), new { id = eventCreated.Id }, eventCreated);
    }


    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateEvent(int id, [FromBody] EventInputDto eventInputDto,
        [FromHeader] string userId)
    {
        var validationResult = await ValidateEventAccess(id, userId);
        if (validationResult != null)
            return validationResult;

        var newEvent = _mapper.Map<Event>(eventInputDto);
        var eventUpdated = await _eventService.UpdateAsync(id, newEvent);
        return ValidateNotNullResponse(_mapper.Map<EventOutputDto>(eventUpdated));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> SoftDeleteEvent(int id, [FromHeader] string userId)
    {
        var validationResult = await ValidateEventAccess(id, userId);
        if (validationResult != null)
            return validationResult;

        var fieldModified = await _eventService.SoftDeleteAsync(id);
        return fieldModified > 0 ? NoContent() : NotFound();
    }

    private async Task<ActionResult?> ValidateEventAccess(int eventId, string userId)
    {
        var existingEvent = await _eventService.GetByIdAsync(eventId);
        if (existingEvent == null)
            return NotFound();

        if (!existingEvent.Id.Equals(userId))
            return Unauthorized();

        return null;
    }

    private ActionResult ValidateNotNullResponse(EventOutputDto @event)
    {
        return @event == null ? NotFound() : Ok(@event);
    }
}