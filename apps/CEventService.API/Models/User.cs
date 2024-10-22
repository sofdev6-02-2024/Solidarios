namespace CEventService.API.Models;

public class User
{
    public required string UserId { get; set; }
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; }
}
