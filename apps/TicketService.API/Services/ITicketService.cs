using TicketService.API.DTOs;
using TicketService.API.Models;

namespace TicketService.API.Services;

public interface ITicketService
{
    Task<TicketResponseDto> GenerateTicketAsync(TicketRequestDto ticketRequest);
    Task<bool> ValidateTicketAsync(string ticketId);
    Task<Ticket?> GetTicketByIdAsync(string ticketId);
}