using CEventService.API.DAO;
using CEventService.API.Data;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

public class EventRepository : BaseRepository<Event, int>, IEventRepository
{
    public EventRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public override async Task<IEnumerable<Event>> GetAllAsync(int page, int pageSize)
    {
        return await _dbContext.Set<Event>()
            .Where(e => !e.IsDeleted)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Include(e => e.Activities)
            .Include(e => e.CoOrganizers)
            .Include(e => e.Category)
            .ToListAsync();
    }

    public override async Task<Event?> GetByIdAsync(int id)
    {
        return await _dbContext.Set<Event>()
            .Include(e => e.Category) 
            .Include(e => e.Activities)
            .Include(e => e.CoOrganizers) 
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
    }

}