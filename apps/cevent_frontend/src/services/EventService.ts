import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * This function fetches a list of events from the API
 *
 * @param page represents the page number
 * @param pageSize represents the number of events per page
 * @returns a list of events
 */
export const getEvents = async (
  page: number,
  pageSize: number,
): Promise<EventHomePageDto[]> => {
  console.log('Fetching events...');
  console.log('BASE_URL:', BASE_URL);
  try {
    const response = await axios.get<EventHomePageDto[]>(
      `${BASE_URL}/event/homepage`,
      {
        params: {
          page,
          pageSize,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};
