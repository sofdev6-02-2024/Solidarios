namespace CEventService.API.DTOs.Activity;

public class AttendanceInputDto
{
    public required string UserId { get; set; }
    public int ActivityId { get; set; }
}