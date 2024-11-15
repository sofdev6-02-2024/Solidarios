namespace CEventService.API.Models;

public class Registration : BaseEntity<int>
{
    public required string UserId { get; set; } 
    public int EventId { get; set; } 
    public required string AttendanceStatus { get; set; }
    public DateTime RegisteredAt { get; set; }
    public required string TicketId { get; set; }
}
