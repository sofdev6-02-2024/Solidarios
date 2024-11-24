using CEventService.API.Models;

namespace CEventService.API.DAO;

public interface IEventClickRepository : IBaseRepository<EventClick, int>
{
    Task<IEnumerable<Event>> GetMostClickedEvents(Func<EventClick, bool>? predicate, int page, int pageSize);
}