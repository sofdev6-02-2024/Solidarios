namespace CEventService.API.DTOs.Activity;

public class AttendanceOutputDto
{
    public int AttendanceId { get; set; }
    public required string UserId { get; set; }
    public int ActivityId { get; set; }
    public DateTime AttendanceTime { get; set; }
}
