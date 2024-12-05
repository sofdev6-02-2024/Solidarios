using CEventService.API.Models;

namespace CEventService.API.Services;

public interface IUserService : IBaseService<User, Guid>
{
    Task<IEnumerable<Guid>> GetIdsByEmails(IEnumerable<string> emails);
}