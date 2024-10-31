export interface EventHomePageDto {
  id: number;
  name: string;
  category: string;
  eventDate: Date;
  address: string;
  ticketPrice: number;
  attendeeCount: number;
  description: string;
  coverPhotoUrl: string;
}

//TODO: Extend this interface to include the rest of the event properties
