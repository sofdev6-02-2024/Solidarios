using TicketService.API.Models;
using Microsoft.EntityFrameworkCore;
using TicketService.API.Database;

namespace TicketService.API.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly TicketDbContext _context;

        public TicketRepository(TicketDbContext context)
        {
            _context = context;
        }

        public async Task<Ticket> CreateTicketAsync(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task<IEnumerable<Ticket>> GetAllTicketAsync()
        {
            return await _context.Tickets.ToListAsync();
        }

        public async Task<Ticket?> GetTicketByIdAsync(Guid ticketId)
        {
            return await _context.Tickets.FindAsync(ticketId);
        }
        
        public async Task<Ticket?> GetTicketByQrContentAsync(string qrContent)
        {
            return await _context.Tickets
                .FirstOrDefaultAsync(t => t.QRContent == qrContent);
        }

        public async Task UpdateTicketStatusAsync(Guid ticketId, bool isUsed)
        {
            var ticket = await GetTicketByIdAsync(ticketId);
            if (ticket != null)
            {
                ticket.IsUsed = isUsed;
                await _context.SaveChangesAsync();
            }
        }
    }
}