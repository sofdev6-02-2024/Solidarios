import {
  TicketPostInterface,
  TicketViewInterface,
} from '@/utils/interfaces/TIcketsInterfaces';
import axios from 'axios';

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
