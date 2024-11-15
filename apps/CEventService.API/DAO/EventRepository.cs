using CEventService.API.DAO;
using CEventService.API.Data;
using CEventService.API.Models;

public class EventRepository : BaseRepository<Event, int>, IEventRepository
{
    public EventRepository(AppDbContext dbContext) : base(dbContext)
    {
    }
}