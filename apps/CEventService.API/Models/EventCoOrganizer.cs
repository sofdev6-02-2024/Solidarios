namespace CEventService.API.Models;

public class EventCoOrganizer : BaseEntity<int>
{
    public required string UserId { get; set; } 
    public int EventId { get; set; }
}
