namespace CEventService.API.Models;

public class Attendance : BaseEntity<int>
{
    public required string UserId { get; set; } 
    public int ActivityId { get; set; }
    public DateTime AttendanceTime { get; set; }
}
