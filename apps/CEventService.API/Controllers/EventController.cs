using AutoMapper;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Authorization;
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

    [Authorize]
    [HttpPost]
    public override async Task<ActionResult<EventOutputDto>> Create([FromBody] EventInputDto inputDto)
    {
        return await base.Create(inputDto);
    }

    [Authorize]
    [HttpPut("{id}")]
    public override async Task<ActionResult> Update(int id, [FromBody] EventInputDto inputDto, [FromHeader] Guid userId)
    {
        var validationResult = await ValidateEventOwnershipAsync(id, userId);
        if (validationResult is not null) return validationResult;

        return await base.Update(id, inputDto, userId);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public override async Task<IActionResult> SoftDelete(int id, [FromHeader] Guid userId)
    {
        var validationResult = await ValidateEventOwnershipAsync(id, userId);
        if (validationResult is not null) return validationResult;

        return await base.SoftDelete(id, userId);
    }

    private async Task<ActionResult?> ValidateEventOwnershipAsync(int eventId, Guid userId)
    {
        var eventEntity = await _eventService.GetByIdAsync(eventId);
        if (eventEntity == null)
            return NotFound("Event not found.");

        if (userId != eventEntity.OrganizerUserId)
            return Unauthorized("You are not authorized to perform this action.");

        return null;
    }
}