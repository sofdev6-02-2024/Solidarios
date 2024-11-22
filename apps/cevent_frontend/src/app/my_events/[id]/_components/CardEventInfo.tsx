import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';

interface CardEventInfoProps {
  eventData: EventDetailDto;
}

const CardEventSummary = ({ eventData }: CardEventInfoProps) => {
  return (
    <div>
      <h1>{eventData.name}</h1>
      <p>{eventData.description}</p>
      <p>{eventData.capacity}</p>
      <p>{eventData.description}</p>
    </div>
  );
};

export default CardEventSummary;
