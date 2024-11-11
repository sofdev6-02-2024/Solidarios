import { EventCategory, CategoryObj } from '@/utils/interfaces/Categories';
import { Box, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import { fetchHomePageEvents } from '@/services/EventService';
import EventsBox from './EventsBox';
import SkeletonEventsBox from './SkeletonEventsBox';
import EmptyEventSection from './EmptyEventSection';

interface EventSectionProps {
  category: EventCategory;
}

const CategoryEventSection = ({ category }: EventSectionProps) => {
  const [events, setEvents] = useState<EventHomePageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchHomePageEvents(1, 6)
      .then((data) => {
        setEvents(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          justifyContent: CategoryObj[category].KeyWordFirst
            ? 'flex-start'
            : 'flex-end',
          flexDirection: CategoryObj[category].KeyWordFirst
            ? 'row'
            : 'row-reverse',
        }}
      >
        <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
          {CategoryObj[category].KeyWord}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          {CategoryObj[category].Phrase}{' '}
        </Typography>
      </Box>
      {events.length < 1 ? (
        loading ? (
          <SkeletonEventsBox />
        ) : (
          <EmptyEventSection />
        )
      ) : (
        <EventsBox events={events} />
      )}
    </Box>
  );
};

export default memo(CategoryEventSection);
