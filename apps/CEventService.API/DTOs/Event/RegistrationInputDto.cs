using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;

public class RegistrationInputDto : IMapFrom<Registration>
{
    public required Guid UserId { get; set; }
    public int EventId { get; set; }
    public required AttendanceStatus AttendanceStatus { get; set; }
    public required string TicketId { get; set; }
}