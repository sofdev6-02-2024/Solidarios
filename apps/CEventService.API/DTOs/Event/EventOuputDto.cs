namespace CEventService.API.DTOs.Event;

public class EventOutputDto : IMapFrom<Models.Event>
{
    public int EventId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public DateTime EventDate { get; set; }
    public required LocationDto Location { get; set; }
    public required string Venue { get; set; }
    public required string Address { get; set; }
    public decimal TicketPrice { get; set; }
    public required string CoverPhotoUrl { get; set; }
    public bool AttendanceTrackingEnabled { get; set; }
    public required string Status { get; set; }
    public int Capacity { get; set; }
    public required Guid OrganizerUserId { get; set; }
    public DateTime CreatedAt { get; set; }
}