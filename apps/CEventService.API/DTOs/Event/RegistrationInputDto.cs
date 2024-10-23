namespace CEventService.API.DTOs.Event;
using Models;

public class RegistrationInputDto : IMapFrom<Registration>
{
    public required string UserId { get; set; }
    public int EventId { get; set; }
    public required string AttendanceStatus { get; set; }
    public required string TicketId { get; set; }
}