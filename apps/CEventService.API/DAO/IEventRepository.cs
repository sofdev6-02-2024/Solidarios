using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.DAO;
public interface IEventRepository : IRepository<Event>
{
    Task<IEnumerable<EventHomePageDto>> GetEventsForHomePageAsync(int page, int pageSize, EventFilterDto filters);
}