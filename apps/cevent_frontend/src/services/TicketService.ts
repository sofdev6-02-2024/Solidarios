import axios from 'axios';
import { TicketRequestDto } from '@/utils/interfaces/TicketInterfaces';
import {
  TicketPostInterface,
  TicketViewInterface,
} from '@/utils/interfaces/TIcketsInterfaces';

/**
 * Fetches tickets based on the given parameters
 *
 * @param ticketRequestDto - Object containing `eventId` and `userId`
 * @returns Array of tickets or an empty array if an error occurs
 */
export const fetchTickets = async (
  ticketRequestDto?: TicketRequestDto,
): Promise<any[]> => {
  try {
    const params = ticketRequestDto
      ? {
          eventId: ticketRequestDto.eventId,
          userId: ticketRequestDto.userId,
        }
      : {};

    const response = await axios.get<any[]>('/api/tickets/list', { params });

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Invalid response format');
      return [];
    }
  } catch (error: any) {
    console.error('Error fetching tickets:', error.message || error);
    return [];
  }
};

export const generateTicket = async (
  ticketPost: TicketPostInterface,
): Promise<TicketViewInterface | null> => {
  try {
    const response = await axios.post<TicketViewInterface>(
      '/api/tickets',
      ticketPost,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
