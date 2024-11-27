namespace TicketService.API.Repositories
{
    using TicketService.API.Models;
    
    public interface ITicketRepository
    {
        Task<Ticket> CreateTicketAsync(Ticket ticket);
        Task<IEnumerable<Ticket>> GetAllTicketAsync();
        Task<Ticket?> GetTicketByIdAsync(Guid ticketId);
        Task<Ticket?> GetTicketByQrContentAsync(string qrContent);
        Task UpdateTicketStatusAsync(Guid ticketId, bool isUsed);
        Task<ICollection<Ticket>> GetTicketsByUser(string userId);
    }
}