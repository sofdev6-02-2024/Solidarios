export interface ActivityInputDto {
  eventId: number;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  capacity: number;
}

export interface ActivityCreateInputDto extends Omit<ActivityInputDto, 'eventId'> {

}