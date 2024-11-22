using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.Services;
public interface IEventService : IBaseService<Event, int>
{
    Task<IEnumerable<EventHomePageDto>> GetSummaryEvents(int page, int pageSize, EventFilterDto filters);
    Task<ICollection<Event>> GetPromotedEvents(int page, int pageSize);
    Task<ICollection<Event>> GetPromotedEvents(int page, int pageSize, string category);
}