using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class EventClickService : BaseService<EventClick, int>, IEventClickService
{
    private readonly IEventClickRepository _repository;

    public EventClickService(IEventClickRepository repository) : base(repository)
    {
        _repository = repository;
    }


    public async Task<IEnumerable<Event>> MostClicked(int page, int pageSize)
    {
        return await _repository.MostClicked(page, pageSize);
    }
}