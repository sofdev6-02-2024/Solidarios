using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;

public class EventCoOrganizerOutputDto : IMapFrom<EventCoOrganizer>
{
    public int CoOrganizerId { get; set; }
    public required string UserId { get; set; }
    public int EventId { get; set; }
}