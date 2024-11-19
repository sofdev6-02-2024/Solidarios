'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Pagination,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import EventCard from './_components/EventCard';
import EmptyEventSection from './_components/EmptyEventSection';
import LoginPromptSection from './_components/LoginPromptSection';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
  activities: number;
  description?: string;
  price?: string;
}

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setEvents([]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateEvent = () => {
    router.push('/create_event');
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const displayedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage,
  );

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    return (
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" fontWeight="bold">
          My Events
        </Typography>
        <Box mt={4}>
          <LoginPromptSection />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '2rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          My Events
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateEvent}
          sx={{ borderRadius: '10px' }}
        >
          Create Event
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : events.length === 0 ? (
        <Box mt={4}>
          <EmptyEventSection />
        </Box>
      ) : (
        <Box mt={3} display="flex" flexDirection="column" alignItems="center">
          {displayedEvents.map((event) => (
            <Box key={event.id} sx={{ width: '60%', mb: 3 }}>
              <EventCard event={event} />
            </Box>
          ))}
          <Pagination
            count={Math.ceil(events.length / eventsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
          />
        </Box>
      )}
    </Box>
  );
}