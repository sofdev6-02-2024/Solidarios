using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;

public class RegistrationOutputDto : IMapFrom<Registration>
{
    public int RegistrationId { get; set; }
    public required Guid UserId { get; set; }
    public int EventId { get; set; }
    public required AttendanceStatus AttendanceStatus { get; set; }
    public DateTime RegisteredAt { get; set; }
    public required string TicketId { get; set; }
}