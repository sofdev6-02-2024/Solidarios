using CEventService.API.Models;

namespace CEventService.API.Services;

public interface IUserService : IBaseService<User, Guid>
{
    Task<User?> GetUserByEmail(string email);
}