using Microsoft.AspNetCore.Mvc;
using CEventService.API.Services;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        
         private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetAllEvents([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var events = await _eventService.GetAllAsync(page, pageSize);
            return Ok(events);
        }

        [HttpGet("homepage")]
        public async Task<ActionResult<IEnumerable<EventHomePageDto>>> GetEventsForHomePage([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var events = await _eventService.GetEventsForHomePageAsync(page, pageSize);
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEventById(int id)
        {
            var @event = await _eventService.GetByIdAsync(id);
            
            if (@event == null)
            {
                return NotFound();
            }

            return Ok(@event);
        }


        [HttpPost]
        public async Task<ActionResult<EventInputDto>> CreateEvent(EventInputDto eventInputDto)
        {
            return Ok();
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, EventInputDto eventInputDto)
        {
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            return Ok();
        }
    }
}
