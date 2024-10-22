namespace CEventService.API.Models;

public class EventCoOrganizer
{
    public int CoOrganizerId { get; set; }
    public required string UserId { get; set; } 
    public int EventId { get; set; }
}
