﻿namespace CEventService.API.DTOs.Activity;

using Models;

public class ActivityOutputDto : IMapFrom<Activity>
{
    public int Id { get; set; }
    public int EventId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public required EventStatus Status { get; set; }
    public int Capacity { get; set; }
}
