using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.Services;
public interface IEventService : IBaseService<Event, int>
{
    Task<IEnumerable<EventHomePageDto>> GetSummaryEvents(int page, int pageSize, EventFilterDto filters);
    Task<bool> PromoteEvent(int eventId, bool isPromoted);
}