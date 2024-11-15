namespace CEventService.API.DTOs.Activity;

public class AttendanceInputDto : IMapFrom<Models.Activity>
{
    public required string UserId { get; set; }
    public int ActivityId { get; set; }
}