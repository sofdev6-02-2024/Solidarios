import {
  EventDetailDto,
  EventHomePageDto,
} from '@/utils/interfaces/EventInterfaces';

/**
 * Fetches the events for the home page
 *
 * @param page number of the page
 * @param pageSize number of events per page
 * @returns an array of events
 */
export const fetchHomePageEvents = async (
  page: number,
  pageSize: number,
): Promise<EventHomePageDto[]> => {
  try {
    const response = await fetch(
      `/api/events/homepage?page=${page}&pageSize=${pageSize}`,
    );
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    return [];
  }
};

export const getEventById = async (
  id: string,
): Promise<EventDetailDto | null> => {
  try {
    const response = await fetch(`/api/events/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};
