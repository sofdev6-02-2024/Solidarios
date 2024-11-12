namespace CEventService.API.DTOs.Event;
public class EventFilterDto
{
    public string? Category { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public string? Status { get; set; }
    public string? SortBy { get; set; } 
    public bool IsDescending { get; set; } = false; 
}
