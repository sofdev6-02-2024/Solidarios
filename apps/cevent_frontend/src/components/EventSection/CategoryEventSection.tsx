import { EventCategory, CategoryObj } from '@/utils/interfaces/Categories';
import { Box, ButtonBase, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import {
  EventFilter,
  EventHomePageDto,
  SortOptions,
} from '@/utils/interfaces/EventInterfaces';
import { fetchHomePageEvents } from '@/services/EventService';
import EventsBox from './EventsBox';
import SkeletonEventsBox from './SkeletonEventsBox';
import EmptyEventSection from './EmptyEventSection';
import SliderEvents from './SliderEvents';
import { useRouter } from 'next/navigation';

interface EventSectionProps {
  category: EventCategory;
}

const CategoryEventSection = ({ category }: EventSectionProps) => {
  const [events, setEvents] = useState<EventHomePageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRouter();
  useEffect(() => {
    const filters: EventFilter = {
      page: 1,
      pageSize: category === EventCategory.All ? 6 : 9,
      Category: category !== EventCategory.All ? category : undefined,
      SortBy: SortOptions.EventDate,
      IsDescending: true,
    };
    fetchHomePageEvents(filters)
      .then((data) => {
        setEvents(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRedirect = () => {
    route.push(`/category/${category}`);
  }
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
      {category !== EventCategory.All && (
        <SliderEvents events={events.slice(0, 3)} />
      )}
      {events.length < 1 ? (
        loading ? (
          <SkeletonEventsBox />
        ) : (
          <EmptyEventSection />
        )
      ) : (
        <EventsBox
          events={category === EventCategory.All ? events : events.slice(3, 9)}
        />
      )}
      {category !== EventCategory.All && (
      <ButtonBase sx={{marginTop: 2}} onClick={handleRedirect}>
        <Typography variant="body" color="secondary" sx={{ fontWeight: 'bold' }}>
          View All
        </Typography>
      </ButtonBase>
      )}
    </Box>
  );
};

export default memo(CategoryEventSection);
