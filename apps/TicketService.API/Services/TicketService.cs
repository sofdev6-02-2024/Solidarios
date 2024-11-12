using TicketService.API.DTOs;
using TicketService.API.Models;
using TicketService.API.Repositories;
using QRCoder;

namespace TicketService.API.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketService(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<TicketResponseDto> GenerateTicketAsync(TicketRequestDto ticketRequest)
        {
            var ticket = new Ticket
            {
                EventId = ticketRequest.EventId,
                UserId = ticketRequest.UserId,
                QRContent = GenerateQrContent()
            };

            ticket.QRContent = GenerateQrCode(ticket.QRContent);

            var createdTicket = await _ticketRepository.CreateTicketAsync(ticket);

            return new TicketResponseDto
            {
                TicketId = createdTicket.TicketId.ToString(),
                QRContent = createdTicket.QRContent
            };
        }

        public async Task<bool> ValidateTicketAsync(string ticketId)
        {
            var ticket = await _ticketRepository.GetTicketByIdAsync(Guid.Parse(ticketId));

            if (ticket == null || ticket.IsUsed) 
                return false;

            ticket.IsUsed = true;
            ticket.DateUsed = DateTime.UtcNow;

            await _ticketRepository.UpdateTicketStatusAsync(ticket.TicketId, ticket.IsUsed);

            return true;
        }
        
        public async Task<Ticket?> GetTicketByIdAsync(string ticketId)
        {
            if (Guid.TryParse(ticketId, out var ticketGuid))
            {
                return await _ticketRepository.GetTicketByIdAsync(ticketGuid);
            }
    
            return null;
        }

        private string GenerateQrCode(string content)
        {
            using (var qrGenerator = new QRCodeGenerator())
            using (var qrCodeData = qrGenerator.CreateQrCode(content, QRCodeGenerator.ECCLevel.Q))
            using (var qrCode = new PngByteQRCode(qrCodeData))
            {
                byte[] qrCodeImage = qrCode.GetGraphic(20);
                return Convert.ToBase64String(qrCodeImage);
            }
        }

        private string GenerateQrContent()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
