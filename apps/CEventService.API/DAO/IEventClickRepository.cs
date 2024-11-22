using CEventService.API.Models;

namespace CEventService.API.DAO;

public interface IEventClickRepository : IBaseRepository<EventClick, int>
{
    Task<IEnumerable<Event>> MostClicked(int page, int pageSize);
}