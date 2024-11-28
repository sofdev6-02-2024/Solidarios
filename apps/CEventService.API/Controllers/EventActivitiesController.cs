using AutoMapper;
using CEventService.API.DTOs.Activity;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;
namespace CEventService.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class EventActivitiesController: ControllerBase
{
    private IMapper _mapper;
    private IActivityService _activityService;
    public EventActivitiesController(IMapper mapper, IActivityService activityService)
    {
        _mapper = mapper;
        _activityService = activityService;
    }

    [HttpGet("{id}/activity")]
    public async Task<ActionResult<IEnumerable<ActivityOutputDto>>> GetAll(int id)
    {
        var activities = await _activityService.GetActivities(id);
        var activitiesDtoOuput = _mapper.Map<IEnumerable<ActivityOutputDto>>(activities);
        return Ok(activitiesDtoOuput);
    }
    
}