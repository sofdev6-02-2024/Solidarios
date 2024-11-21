using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class UserService : BaseService<User, Guid>, IUserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository) : base(repository)
    {
        _repository = repository;
    }
}