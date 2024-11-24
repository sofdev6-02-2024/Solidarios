using CEventService.API.Models;

namespace CEventService.API.Services;

public interface IEventClickService : IBaseService<EventClick, int>
{
    Task<IEnumerable<Event>> MostClicked(int page, int pageSize);
    Task<IEnumerable<Event>> MostClicked(int page, int pageSize, string category);
    Task<IEnumerable<Event>> MostClickedPromoted(int page, int pageSize);
    Task<IEnumerable<Event>> MostClickedPromoted(int page, int pageSize, string category);
}