using CEventService.API.DAO;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class EventService : BaseService<Event, int>, IEventService
{
    private readonly IEventRepository _eventRepository;
    public EventService(IEventRepository repository) : base(repository)
    {
        _eventRepository = repository;
    }

    public Task<IEnumerable<EventHomePageDto>> GetSummaryEvents(int page, int pageSize, EventFilterDto filters)
    {
        var events = _eventRepository.GetSummaryEvents(page, pageSize, filters);
        return events;
    }

    public async Task<bool> PromoteEvent(int eventId, bool isPromoted)
    {
        var eventSearched = await _eventRepository.GetByIdAsync(eventId);
        if (eventSearched is null) return false;
        eventSearched.IsPromoted = isPromoted;
        var response = await _eventRepository.UpdateAsync(eventId, eventSearched);
        if (response is null) return false;
        return true;
    }
}