﻿using TicketService.API.DTOs;
using TicketService.API.Models;

namespace TicketService.API.Services;

public interface ITicketService
{
    Task<TicketResponseDto> GenerateTicketAsync(TicketRequestDto ticketRequest);
    Task<IEnumerable<TicketRequestDto>> GetAllTicketsAsync();
    Task<bool> ValidateTicketAsync(string ticketId);
    Task<TicketResponseDto?> GetTicketByIdAsync(string ticketId);
    Task<TicketResponseDto?> GetTicketByQrCodeAsync(string qrContent);
}