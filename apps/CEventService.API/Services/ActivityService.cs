using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class ActivityService : BaseService<Event, int>, IActivityService
{
    private readonly IEventRepository _repository;

    public ActivityService(IEventRepository repository) : base(repository)
    {
        _repository = repository;
    }

    public async Task<Activity> DeleteActivity(int eventId, int id)
    {
        var eventActivity = await _repository.GetByIdAsync(eventId);
        var activity = eventActivity.Activities.First( act => act.Id == id);
        eventActivity.Activities.Remove(activity);
        return activity;
    }

    public async Task<IEnumerable<Activity>> GetActivities(int eventId)
    {
        var eventActivity = await _repository.GetByIdAsync(eventId);
        return eventActivity.Activities;
    }

    public Task<IEnumerable<Activity>> GetActivitiesByStatus(int eventId, int status)
    {
        throw new NotImplementedException();
    }

    public Task<Activity> GetActivity(int eventId, int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Activity>> UpdateActivity(int eventId, Activity activity)
    {
        throw new NotImplementedException();
    }
}