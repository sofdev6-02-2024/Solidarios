namespace CEventService.API.DTOs.User;

public class UserOutputDto : IMapFrom<Models.User>
{
    public required string UserId { get; set; }
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
}