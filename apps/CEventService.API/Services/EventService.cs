using CEventService.API.DAO;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class EventService : BaseService<Event, int>, IEventService

{
    private readonly IEventRepository _eventRepository;
    private readonly IEventClickRepository _eventClickRepository;
    public EventService(IEventRepository repository, IEventClickRepository eventClickRepository) : base(repository)
    {
        _eventRepository = repository;
        _eventClickRepository = eventClickRepository;
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
        var responseCreate = await _eventClickRepository.CreateAsync(new EventClick
        {
            EventId = eventId,
            UserId = response.OrganizerUserId
        });
        
        return true;
    }
    
    public async Task<ICollection<Event>> GetPromotedEvents(int page, int pageSize)
    {
        return await _eventRepository.GetFilteredPagedAsync(
            e => !e.IsDeleted && e.IsPromoted,
            page,
            pageSize
        );
    }
    
    public async Task<ICollection<Event>> GetPromotedEvents(int page, int pageSize, string category)
    {
        return await _eventRepository.GetFilteredPagedAsync(
            e => !e.IsDeleted && e.IsPromoted && e.Category.KeyWord.Equals(category),
            page,
            pageSize
        );
    }
}