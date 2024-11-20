import {
  EventHomePageDto,
  EventInputDto,
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

/**
 * Creates a new event in the database
 *
 * @param eventData The data of the event to be created
 * @returns The created event or an error message
 */
export const createEvent = async (
  eventData: EventInputDto,
): Promise<EventInputDto | { error: string }> => {
  try {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      return { error: 'Failed to create event' };
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    return { error: 'An unexpected error occurred' };
  }
};
