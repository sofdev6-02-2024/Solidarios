using System.Linq.Expressions;
using CEventService.API.Data;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CEventService.API.DAO;

public class EventClickRepository : BaseRepository<EventClick, int>, IEventClickRepository
{
    public EventClickRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<Event>> GetMostClickedEvents(Expression<Func<EventClick, bool>>? predicate, int page, int pageSize)
    {
        var clickCountsQuery = _dbContext.Set<EventClick>()
            .Where(predicate ?? (_ => true))
            .GroupBy(ec => ec.EventId)
            .Select(group => new
            {
                EventId = group.Key,
                ClickCount = group.Count()
            });

        var clickCounts = await clickCountsQuery
            .OrderByDescending(e => e.ClickCount)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var eventIds = clickCounts.Select(cc => cc.EventId).ToList();
        var events = await _dbContext.Set<Event>()
            .Where(e => eventIds.Contains(e.Id))
            .ToListAsync();

        var orderedEvents = clickCounts
            .Join(events,
                cc => cc.EventId,
                e => e.Id,
                (cc, e) => new { Event = e, cc.ClickCount }) 
            .OrderByDescending(e => e.ClickCount)           
            .Select(e => e.Event)                           
            .ToList();

        return orderedEvents;
    }

}