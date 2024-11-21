namespace CEventService.API.DTOs.User;

using Models;
public class UserInputDto : IMapFrom<User>
{
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
}