﻿using Microsoft.AspNetCore.Mvc;
using CEventService.API.Services;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<ActionResult<IEnumerable<EventHomePageDto>>> GetEventsForHomePage(
    [FromQuery] EventFilterDto filters, 
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 10)
        {
            var events = await _eventService.GetEventsForHomePageAsync(page, pageSize, filters);
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
        public async Task<ActionResult<EventOutputDto>> CreateEvent([FromBody] EventInputDto newEventDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdEvent = await _eventService.CreateEventAsync(newEventDto);
                return CreatedAtAction(nameof(GetEventById), new { id = createdEvent.EventId }, createdEvent);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while creating the event." + ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] EventInputDto eventInputDto, [FromHeader] string userId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updateResult = await _eventService.UpdateEventAsync(id, eventInputDto, userId);

                if (updateResult == null)
                {
                    return NotFound($"Event with ID {id} not found.");
                }
                else if (updateResult.Equals(false))
                {
                    return Forbid("You are not authorized to update this event.");
                }

                return Ok("Event updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the event: {ex.Message}");
            }
        }
        

        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeleteEvent(int id, [FromHeader] string requesterId)
        {
            try
            {
                var result = await _eventService.SoftDeleteEventAsync(id, requesterId);

                if (!result)
                {
                    return NotFound($"Event with ID {id} not found or you are not authorized to delete this event.");
                }

                return Ok($"Event with ID {id} has been soft deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the event: {ex.Message}");
            }
        }

    }
}
