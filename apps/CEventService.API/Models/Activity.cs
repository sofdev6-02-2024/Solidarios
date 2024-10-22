namespace CEventService.API.Models;

public class Activity
{
    public int ActivityId { get; set; }
    public int EventId { get; set; } 
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public required string Status { get; set; }
    public int Capacity { get; set; }
    public DateTime CreatedAt { get; set; }
}
