namespace CEventService.API.DTOs.Event;

public class RegistrationOutputDto
{
    public int RegistrationId { get; set; }
    public required string UserId { get; set; }
    public int EventId { get; set; }
    public required string AttendanceStatus { get; set; }
    public DateTime RegisteredAt { get; set; }
    public required string TicketId { get; set; }
}