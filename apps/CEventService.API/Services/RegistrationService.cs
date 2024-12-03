using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class RegistrationService : BaseService<Registration, int>, IRegistrationService
{
    public RegistrationService(IRegistrationRepository repository) : base(repository)
    {
    }
}