export interface Location {
  longitude: number;
  latitude: number;
}

export interface EventCardProps {
  event: {
    id: number;
    name: string;
    location: Location;
    venue: string;
    attendees: number;
    activities: number;
    description?: string;
    price?: number;
    createdAt: Date;
  };
}

export interface EventDTO {
  id: number;
  name: string;
  location: Location;
  venue: string;
  attendees: number;
  activities: number;
  description?: string;
  price?: number;
  organizerUserId: string;
  createdAt: Date;
}
