import axios from 'axios';
import {
  EventClickDto,
  EventDetailDto,
  EventFilter,
  EventHomePageDto,
  EventInputDto,
  EventSearchToUserDto,
} from '@/utils/interfaces/EventInterfaces';
import { PromoteEventDto } from '@/utils/interfaces/Promotions';

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
      IsPromoted: filter.IsPromoted,
    };

    const response = await axios.get<EventHomePageDto[]>(
      '/api/events/homepage',
      { params },
    );

    return response.data;
  } catch (error) {
    return [];
  }
};

export const getEventById = async (
  id: string,
): Promise<EventDetailDto | null> => {
  try {
    const response = await axios.get<EventDetailDto>(`/api/events/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const fetchAllEvents = async (): Promise<EventSearchToUserDto[]> => {
  try {
    const response =
      await axios.get<EventSearchToUserDto[]>('/api/events/list');
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchBannerEvents = async (
  category: string,
): Promise<EventHomePageDto[]> => {
  try {
    const params = {
      page: 1,
      pageSize: 10,
    };
    const response = await axios.get<EventHomePageDto[]>(
      `/api/events/banner/${category}`,
      { params },
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createClickedEvent = async (
  data: EventClickDto,
): Promise<void> => {
  try {
    const response = await axios.post('api/events/clicks', data);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Crea un nuevo evento
 *
 * @param eventData objeto que contiene los datos del evento
 * @returns el evento creado o null en caso de error
 */
export const createEvent = async (
  eventData: EventInputDto,
): Promise<EventInputDto | null> => {
  try {
    const response = await axios.post<EventInputDto>(
      '/api/events/list',
      eventData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 201) {
      return response.data;
    }

    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Updates the status of an event
 *
 * @param eventPromoteDto object containing the event id and the new status
 * @returns true if the status was updated successfully, false otherwise
 */
export const updatePromoteStatusEvent = async (
  eventPromoteDto: PromoteEventDto,
): Promise<boolean> => {
  try {
    const response = await axios.post(
      '/api/events/promotion',
      eventPromoteDto,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.status === 201;
  } catch (error) {
    return false;
  }
};
