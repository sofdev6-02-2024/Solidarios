namespace CEventService.API.DTOs.Activity;

public class ActivityInputDto
{
    public int EventId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int Capacity { get; set; }
}