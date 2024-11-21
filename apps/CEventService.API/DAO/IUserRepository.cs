using CEventService.API.Models;

namespace CEventService.API.DAO;

public interface IUserRepository : IBaseRepository<User, Guid>
{
}