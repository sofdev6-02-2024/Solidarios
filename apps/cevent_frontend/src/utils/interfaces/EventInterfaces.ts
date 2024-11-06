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