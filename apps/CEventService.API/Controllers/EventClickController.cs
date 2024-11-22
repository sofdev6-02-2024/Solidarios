using System.Collections;
using AutoMapper;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CEventService.API.Controllers;

[ApiController]
[Route("api/Event/event-clicks")]
public class EventClickController : BaseController<EventClick, EventClickOutputDto, EventClickInputDto, int>
{
    private readonly IEventClickService _eventClickService;
    private readonly IEventService _eventService;

    public EventClickController(IMapper mapper, IEventClickService eventClickService, IEventService eventService) :
        base(mapper, eventClickService)
    {
        _eventClickService = eventClickService;
        _eventService = eventService;
    }

    [HttpGet("banner")]
    public async Task<ActionResult<IEnumerable<EventHomePageDto>>> GetPromotedAndMostClickedEvents(int page = 1, int pageSize = 10)
    {
        var promotedEvents = (await _eventService.GetPromotedEvents(page, pageSize)).ToList();
        
        if (promotedEvents.Count < pageSize)
        {
            var mostClicked = await _eventClickService.MostClicked(page, pageSize - promotedEvents.Count);

            var mostClickedWithoutDuplicates = mostClicked
                .Where(mc => promotedEvents.All(pe => pe.Id != mc.Id));

            promotedEvents.AddRange(mostClickedWithoutDuplicates);
        }

        var response = _mapper.Map<IEnumerable<EventHomePageDto>>(promotedEvents);

        return Ok(response);
    }

}