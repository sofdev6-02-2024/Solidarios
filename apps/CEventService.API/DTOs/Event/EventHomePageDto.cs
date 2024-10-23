namespace CEventService.API.DTOs.Event;
using Models;

public class EventHomePageDto : IMapFrom<Event>
{
    public int EventId { get; set; }           
    public required string Name { get; set; }           
    public required string Category { get; set; }       
    public DateTime EventDate { get; set; }    
    public required string Address { get; set; }       
    public decimal TicketPrice { get; set; }   
    public int AttendeeCount { get; set; }     
    public required string Description { get; set; }    
    public required string CoverPhotoUrl { get; set; } 
}
