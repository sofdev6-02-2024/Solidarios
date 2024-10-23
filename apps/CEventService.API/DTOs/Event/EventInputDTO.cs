namespace CEventService.API.DTOs.Event;
using Models;

public class EventInputDto : IMapFrom<Event>
{
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
    public int Capacity { get; set; }
}