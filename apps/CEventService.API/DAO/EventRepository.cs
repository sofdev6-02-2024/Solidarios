using CEventService.API.Data;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CEventService.API.DAO
{
    public class EventRepository : IRepository<Event>
    {
        private readonly AppDbContext _context;

        public EventRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync(int skip, int take)
        {
            return await _context.Events
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }

        public async Task<Event?> GetEventByIdAsync(int id)
        {
            return await _context.Events.FindAsync(id);
        }

        public async Task<IEnumerable<Event>> GetEventsForHomePageAsync()
        {
            return await _context.Events
                .Include(e => e.Location)
                .Where(e => e.Status == "Active" && e.EventDate > DateTime.UtcNow)
                .OrderBy(e => e.EventDate)
                .Take(10)
                .ToListAsync();
        }
    }
}