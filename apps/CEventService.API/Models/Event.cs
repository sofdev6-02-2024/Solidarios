namespace CEventService.API.Models;

public class Event
{
    public int EventId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public DateTime EventDate { get; set; }
    public Location Location { get; set; } = null!;
    public required string Venue { get; set; }
    public decimal TicketPrice { get; set; }
    public required string CoverPhotoUrl { get; set; }
    public bool AttendanceTrackingEnabled { get; set; }
    public required string Status { get; set; }
    public int Capacity { get; set; }
    public required string OrganizerUserId { get; set; } 
    public DateTime CreatedAt { get; set; }
    public required string Address { get; set; }
    public int AttendeeCount { get; set; }
    public bool IsDeleted { get; set; }
}
