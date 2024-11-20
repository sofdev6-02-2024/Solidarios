﻿namespace CEventService.API.DTOs.Activity;
using Models;
public class AttendanceInputDto : IMapFrom<Activity>
{
    public required string UserId { get; set; }
    public int ActivityId { get; set; }
}