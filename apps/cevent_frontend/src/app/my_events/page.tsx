"use client";

import React, { useState, useEffect } from 'react';
import { Button, Typography, CircularProgress, Box, Pagination } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import EventCard from './_components/EventCard';

export default function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setEvents([
        { id: 1, title: 'The future conference', date: 'August 28, 2021', location: 'Cochabamba', attendees: 500, activities: 5 },
        { id: 2, title: 'The future conference', date: 'August 28, 2021', location: 'Cochabamba', attendees: 500, activities: 5 },
        { id: 3, title: 'The future conference', date: 'August 28, 2021', location: 'Cochabamba', attendees: 500, activities: 5 },
        { id: 4, title: 'The future conference', date: 'August 28, 2021', location: 'Cochabamba', attendees: 500, activities: 5 },
        { id: 5, title: 'The future conference', date: 'August 28, 2021', location: 'Cochabamba', attendees: 500, activities: 5 },
      ]);
      setIsLoggedIn(true); 
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateEvent = () => {
    router.push('/create_event');
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const displayedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <Box sx={{ padding: '2rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          My Events
        </Typography>
        {isLoggedIn && (
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateEvent}>
            Create Event
          </Button>
        )}
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : events.length > 0 ? (
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
            sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
          />
        </Box>
      ) : (
        <Box mt={4} textAlign="center">
          {isLoggedIn ? (
            <>
              <Typography variant="h6">No events created yet.</Typography>
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateEvent} sx={{ mt: 2 }}>
                Create your first event
              </Button>
            </>
          ) : (
            <Typography variant="h6">Please log in to create and view events.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}