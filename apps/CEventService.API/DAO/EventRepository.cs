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

        public async Task<Event> UpdateAsync(Event updatedEvent)
        {
            _context.Events.Update(updatedEvent);
            await _context.SaveChangesAsync();
            return updatedEvent;
        }

        public async Task<IEnumerable<EventHomePageDto>> GetEventsForHomePageAsync(int page, int pageSize)
        {
            var events =  await _context.Events
                .Skip(page)
                .Take(pageSize)
                .ToListAsync();
            return _mapper.Map<IEnumerable<EventHomePageDto>>(events);
        }
    }
}