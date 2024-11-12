using AutoMapper;
using CEventService.API.Data;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CEventService.API.DAO
{
    public class EventRepository : IEventRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public EventRepository(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Event>> GetAllAsync(int page, int pageSize)
        {
            return await _context.Events
                .Skip(page)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Event?> GetByIdAsync(int id)
        {
            return await _context.Events.FindAsync(id);
        }

        public async Task<Event> CreateAsync(Event newEvent)
        {
            _context.Events.Add(newEvent);
            newEvent.Status = "PENDING";
            newEvent.OrganizerUserId = "Users-Not-Implemented-Yet";
            newEvent.CreatedAt = DateTime.Now;
            newEvent.AttendeeCount = 0;
            await _context.SaveChangesAsync();
            return newEvent;
        }

        public async Task UpdateAsync(Event updatedEvent)
        {
            _context.Events.Update(updatedEvent);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<EventHomePageDto>> GetEventsForHomePageAsync(int page, int pageSize, EventFilterDto filters)
        {
            var query = _context.Events.AsQueryable();

            // Filtros
            if (!string.IsNullOrEmpty(filters.Category))
                query = query.Where(e => e.Category == filters.Category);

            if (filters.StartDate.HasValue)
                query = query.Where(e => e.EventDate >= filters.StartDate.Value);

            if (filters.EndDate.HasValue)
                query = query.Where(e => e.EventDate <= filters.EndDate.Value);

            if (filters.MinPrice.HasValue)
                query = query.Where(e => e.TicketPrice >= filters.MinPrice.Value);

            if (filters.MaxPrice.HasValue)
                query = query.Where(e => e.TicketPrice <= filters.MaxPrice.Value);

            if (!string.IsNullOrEmpty(filters.Status))
                query = query.Where(e => e.Status == filters.Status);

            // Ordenamiento
            if (!string.IsNullOrEmpty(filters.SortBy))
            {
                query = filters.IsDescending
                    ? query.OrderByDescending(e => EF.Property<object>(e, filters.SortBy))
                    : query.OrderBy(e => EF.Property<object>(e, filters.SortBy));
            }

            // Paginación
            query = query.Skip((page - 1) * pageSize).Take(pageSize);

            var events = await query
                .Select(e => _mapper.Map<EventHomePageDto>(e))
                .ToListAsync();

            return events;
        }

    }
}