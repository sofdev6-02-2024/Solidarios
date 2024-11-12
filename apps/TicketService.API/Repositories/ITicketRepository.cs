namespace TicketService.API.Repositories
{
    using TicketService.API.Models;
    
    public interface ITicketRepository
    {
        Task<Ticket> CreateTicketAsync(Ticket ticket);
        Task<Ticket?> GetTicketByIdAsync(Guid ticketId);
        Task UpdateTicketStatusAsync(Guid ticketId, bool isUsed);
    }
}