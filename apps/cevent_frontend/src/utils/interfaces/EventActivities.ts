export interface EventActivity {
    id: number;
    eventId: number;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    status: string;
    capacity: number;
}