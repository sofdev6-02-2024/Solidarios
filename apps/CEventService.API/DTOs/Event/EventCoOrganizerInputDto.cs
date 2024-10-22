namespace CEventService.API.DTOs.Event;

public class EventCoOrganizerInputDto
{
    public required string UserId { get; set; }
    public int EventId { get; set; }
}
