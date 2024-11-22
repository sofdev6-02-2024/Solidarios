using CEventService.API.Models;

namespace CEventService.API.Services;

public interface IEventClickService : IBaseService<EventClick, int>
{
    Task<IEnumerable<Event>> MostClicked(int page, int pageSize);
}