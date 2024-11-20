using CEventService.API.Data;
using CEventService.API.Models;

namespace CEventService.API.DAO;

public class UserRepository : BaseRepository<User, Guid>, IUserRepository
{
    public UserRepository(AppDbContext dbContext) : base(dbContext)
    {
    }
}