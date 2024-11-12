import axios from 'axios';
import {
  EventFilter,
  EventHomePageDto,
} from '@/utils/interfaces/EventInterfaces';

/**
 * Fetches the events for the home page
 *
 * @param filter object containing filter options
 * @returns an array of events
 */
export const fetchHomePageEvents = async (
  filter: EventFilter,
): Promise<EventHomePageDto[]> => {
  try {
    const params = {
      page: filter.page,
      pageSize: filter.pageSize,
      Category: filter.Category,
      StartDate: filter.StartDate,
      EndDate: filter.EndDate,
      MinPrice: filter.MinPrice,
      MaxPrice: filter.MaxPrice,
      Status: filter.Status,
      SortBy: filter.SortBy,
      IsDescending: filter.IsDescending,
    };

    const response = await axios.get<EventHomePageDto[]>(
      '/api/events/homepage',
      { params },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};
