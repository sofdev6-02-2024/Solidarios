using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using CEventService.API.DTOs;
using CEventService.API.DTOs.Event;

namespace CEventService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventOutputDto>>> GetAllEvents()
        {
            return Ok();
        }

        [HttpGet("homepage")]
        public async Task<ActionResult<IEnumerable<EventHomePageDto>>> GetEventsForHomePage()
        {
            return Ok();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<EventOutputDto>> GetEventById(int id)
        {
            return Ok();
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
