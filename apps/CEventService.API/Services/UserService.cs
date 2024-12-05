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

    public async Task<IEnumerable<Guid>> GetIdsByEmails(IEnumerable<string> emails)
    {
        var users = await _repository.GetAllEmailsAsync(u => emails.Contains(u.Email));
        return users.Select(u => u.Id);
    }
}