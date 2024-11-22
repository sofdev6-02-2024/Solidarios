import { EventCategory } from './Categories';

export interface Location {
  longitude: number;
  latitude: number;
}

export interface EventHomePageDto {
  id: number;
  name: string;
  category: string;
  eventDate: Date;
  address: string;
  ticketPrice: number;
  attendeeCount: number;
  shortDescription: string;
  coverPhotoUrl: string;
}

export interface EventDetailDto extends Omit<EventHomePageDto, 'category'> {
  location: Location;
  venue: string;
  attendanceTrackingEnabled: boolean;
  status: string;
  capacity: number;
  organizerUserId: number;
  createdAt: Date;
  category: EventCategory;
  description: string;
}

export interface EventSearchToUserDto
  extends Omit<EventHomePageDto, 'category'> {
  location: Location;
  venue: string;
  attendanceTrackingEnabled: boolean;
  status: string;
  capacity: number;
  organizerUserId: string;
  createdAt: Date;
  category: EventCategory;
  description: string;
  activities: number;
}

export enum SortOptions {
  EventDate = 'EventDate',
  TicketPrice = 'TicketPrice',
  AttendeeCount = 'AttendeeCount',
}

export interface EventFilter {
  Category?: string;
  StartDate?: string;
  EndDate?: string;
  MinPrice?: number;
  MaxPrice?: number;
  Status?: string;
  SortBy?: SortOptions;
  IsDescending?: boolean;
  page?: number;
  pageSize?: number;
}

export interface EventInputDto {
  name: string;
  shortDescription: string;
  description: string;
  categoryId: number;
  eventDate: Date;
  location: Location;
  venue: string;
  ticketPrice: number;
  coverPhotoUrl: string;
  attendanceTrackingEnabled: boolean;
  status: number;
  capacity: number;
  organizerUserId: string;
  createdAt: Date;
  address: string;
  attendeeCount: number;
}
