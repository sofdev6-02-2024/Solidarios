namespace CEventService.API.DTOs.Event;

public class EventHomePageDto
{
    public int EventId { get; set; }           
    public required string Name { get; set; }           
    public required string Category { get; set; }       
    public DateTime EventDate { get; set; }    
    public required string Location { get; set; }       
    public decimal TicketPrice { get; set; }   
    public int AttendeeCount { get; set; }     
    public required string Description { get; set; }    
    public required string CoverPhotoUrl { get; set; } 
}
