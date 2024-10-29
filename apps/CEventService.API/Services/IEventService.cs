using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.Services;
public interface IEventService : IService<Event>
{
    Task<IEnumerable<EventHomePageDto>> GetEventsForHomePageAsync(int page, int pageSize);
}