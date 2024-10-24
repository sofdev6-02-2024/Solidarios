using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;

public class EventCoOrganizerInputDto : IMapFrom<EventCoOrganizer>
{
    public required string UserId { get; set; }
    public int EventId { get; set; }
}
