export interface EventActivity {
  id: number;
  eventId: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: number;
  capacity: number;
}

export interface EventActivityDto {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: number;
  capacity: number;
}
