// pages/event/[id].tsx
import EventView from '@/components/EventView';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';

interface EventPageProps {
  eventData: EventDetailDto;
}

const EventPage = ({ eventData }: EventPageProps) => {
  return <EventView eventData={eventData} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  
  try {
    const response = await axios.get(`/events/api/event?id=${id}`);
    return { props: { eventData: response.data } };
  } catch (error) {
    return { props: { eventData: null } };
  }
};

export default EventPage;
