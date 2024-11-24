using CEventService.API.Data;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CEventService.API.DAO;

public class EventClickRepository : BaseRepository<EventClick, int>, IEventClickRepository
{
    public EventClickRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<Event>> MostClicked(int page, int pageSize)
    {
        return await _dbContext.Set<EventClick>()
            .GroupBy(ec => ec.EventId)
            .Select(group => new
            {
                EventId = group.Key,
                ClickCount = group.Count()
            })
            .OrderByDescending(e => e.ClickCount)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Join(_dbContext.Set<Event>(),
                click => click.EventId,
                eventItem => eventItem.Id,
                (click, eventItem) => eventItem)
            .ToListAsync();
    }
}