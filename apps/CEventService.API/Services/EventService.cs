using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class EventService : BaseService<Event, int>, IEventService
{
    private readonly IEventRepository _eventRepository;
    public EventService(IEventRepository repository) : base(repository)
    {
        _eventRepository = repository;
    }
}