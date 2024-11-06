export interface Location {
  longitude: number;
  latitude: number;
}

export interface EventHomePageDto {
  eventId: number;
  name: string;
  category: string;
  eventDate: Date;
  address: string;
  ticketPrice: number;
  attendeeCount: number;
  description: string;
  coverPhotoUrl: string;
}

export interface EventDetailDto extends EventHomePageDto {
  location: Location;
  venue: string;
  attendanceTrackingEnabled: boolean;
  status: string;
  capacity: number;
  organizerUserId: number;
  createdAt: Date;
}

interface Event {
  name: string;
  description: string;
  category: string;
  eventDate: string;
  location: Location;
  venue: string;
  address: string;
  ticketPrice: number;
  coverPhotoUrl: string;
  attendanceTrackingEnabled: boolean;
  capacity: number;
}

interface EventResponse extends Event {
  eventId: number;
}

interface PaginatedResponse {
  items: EventResponse[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
}

export interface SuccessResponse {
  data: EventResponse | PaginatedResponse;
}

export interface ErrorResponse {
  error: string;
}