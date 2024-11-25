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