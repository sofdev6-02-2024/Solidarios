using TicketService.API.DTOs;
using TicketService.API.Models;
using TicketService.API.Repositories;
using TicketService.API.Utilities;

namespace TicketService.API.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly QrCodeGeneratorUtility _generatorUtility;

        public TicketService(ITicketRepository ticketRepository, QrCodeGeneratorUtility qrCodeUtility)
        {
            _ticketRepository = ticketRepository;
            _generatorUtility = qrCodeUtility;
        }

        public async Task<TicketResponseDto> GenerateTicketAsync(TicketRequestDto ticketRequest)
        {
            var ticket = new Ticket
            {
                EventId = ticketRequest.EventId,
                UserId = ticketRequest.UserId,
                QRContent = _generatorUtility.GenerateQrContent()
            };

            ticket.QRContent = _generatorUtility.GenerateQrCode(ticket.QRContent);

            var createdTicket = await _ticketRepository.CreateTicketAsync(ticket);

            return new TicketResponseDto
            {
                TicketId = createdTicket.TicketId.ToString(),
                QRContent = createdTicket.QRContent,
            };
        }

        public async Task<IEnumerable<TicketRequestDto>> GetAllTicketsAsync()
        {
            var tickets = await _ticketRepository.GetAllTicketAsync();

            return tickets.Select(ticket => new TicketRequestDto
            {
                EventId = ticket.EventId,
                UserId = ticket.UserId
            });
        }

        public async Task<bool> ValidateTicketAsync(string qrContent)
        {
            var ticket = await _ticketRepository.GetTicketByQrContentAsync(qrContent);

            if (ticket == null || ticket.IsUsed)
                return false;

            ticket.IsUsed = true;
            ticket.DateUsed = DateTime.UtcNow;

            await _ticketRepository.UpdateTicketStatusAsync(ticket.TicketId, ticket.IsUsed);

            return true;
        }

        public async Task<TicketResponseDto?> GetTicketByIdAsync(string ticketId)
        {
            if (!Guid.TryParse(ticketId, out var ticketGuid))
            {
                throw new ArgumentException("Invalid ticket ID format", nameof(ticketId));
            }

            var ticket = await _ticketRepository.GetTicketByIdAsync(ticketGuid);

            if (ticket == null)
            {
                return null;
            }

            return new TicketResponseDto
            {
                TicketId = ticket.TicketId.ToString(),
                QRContent = ticket.QRContent
            };
        }


        public async Task<TicketResponseDto?> GetTicketByQrCodeAsync(string qrContent)
        {
            if (string.IsNullOrEmpty(qrContent))
            {
                throw new ArgumentException("QR content cannot be null or empty", nameof(qrContent));
            }

            var ticket = await _ticketRepository.GetTicketByQrContentAsync(qrContent);

            if (ticket == null)
            {
                return null;
            }

            return new TicketResponseDto
            {
                TicketId = ticket.TicketId.ToString(),
                QRContent = ticket.QRContent
            };
        }
    }
}
