namespace CEventService.API.DTOs.Activity;
using Models;

public class ActivityInputDto : IMapFrom<Activity>
{
    public int EventId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int Capacity { get; set; }
}