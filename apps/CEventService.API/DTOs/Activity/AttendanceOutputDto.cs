namespace CEventService.API.DTOs.Activity;

public class AttendanceOutputDto : IMapFrom<Models.Activity>
{
    public int AttendanceId { get; set; }
    public required string UserId { get; set; }
    public int ActivityId { get; set; }
    public DateTime AttendanceTime { get; set; }
}
