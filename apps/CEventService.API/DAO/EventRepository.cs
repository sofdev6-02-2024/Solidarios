using CEventService.API.DAO;
using CEventService.API.Data;
using CEventService.API.Models;

public class EventRepository : BaseRepository<Event, int>, IEventBaseRepository
{
    public EventRepository(AppDbContext dbContext) : base(dbContext)
    {
    }
}