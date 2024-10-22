namespace CEventService.API.DTOs.Event;

public class RegistrationInputDto
{
    public required string UserId { get; set; }
    public int EventId { get; set; }
    public required string AttendanceStatus { get; set; }
    public required string TicketId { get; set; }
}