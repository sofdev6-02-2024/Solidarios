using AutoMapper;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;
namespace CEventService.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ActivitiesController : BaseController<Activity, Activity, Activity, int>
{
    public ActivitiesController(IMapper mapper, IActivityService activityService)
        : base(mapper, activityService)
    {
    }
}