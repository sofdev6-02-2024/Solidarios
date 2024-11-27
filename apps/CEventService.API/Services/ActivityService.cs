using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class ActivityService : BaseService<Activity, int>, IActivityService
{
    private readonly IActivityRepository _repository;

    public ActivityService(IActivityRepository repository) : base(repository)
    {
        _repository = repository;
    }
}