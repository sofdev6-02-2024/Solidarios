using CEventService.API.Data;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CEventService.API.DAO;

public class EventClickRepository : BaseRepository<EventClick, int>, IEventClickRepository
{
    public EventClickRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<Event>> GetMostClickedEvents(Func<EventClick, bool>? predicate, int page, int pageSize)
    {
        var clickCounts = await _dbContext.Set<EventClick>()
            .Where(ec => predicate == null || predicate(ec))
            .GroupBy(ec => ec.EventId)
            .Select(group => new
            {
                EventId = group.Key,
                ClickCount = group.Count()
            })
            .OrderByDescending(e => e.ClickCount)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var result = await _dbContext.Set<Event>()
            .Where(e => clickCounts.Select(cc => cc.EventId).Contains(e.Id))
            .ToListAsync();

        return result;
    }
}