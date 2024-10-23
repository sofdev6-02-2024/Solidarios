using AutoMapper;

namespace CEventService.API.DTOs.Event;
using Models;

public class EventOutputDto : IMapFrom<Event>
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
    public required string OrganizerUserId { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Event, EventOutputDto>().ReverseMap();
    }
}