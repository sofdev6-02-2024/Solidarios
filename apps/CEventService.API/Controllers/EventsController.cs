using Microsoft.AspNetCore.Mvc;

namespace CEventService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetEvents()
        {
            var events = new[]
            {
                new { Id = 1, Name = "Music Festival", Date = "2024-10-15" },
                new { Id = 2, Name = "Tech Conference", Date = "2024-11-05" },
            };

            return Ok(events);
        }

        
        [HttpPost]
        public IActionResult CreateEvent([FromBody] Event newEvent)
        {
            return CreatedAtAction(nameof(GetEvents), new { id = newEvent.Id }, newEvent);
        }
    }
}
