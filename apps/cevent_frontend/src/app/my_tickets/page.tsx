'use client';

import { Box, Typography, Pagination, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import TicketCard from './_components/TicketCard';
import LoginPromptSection from './_components/LoginPromptSection';
import EmptyTicketSection from './_components/EmptyTicketSection';
import { fetchTickets } from '@/services/TicketService';
import { fetchAllEvents } from '@/services/EventService';
import { EventSearchToUserDto } from '@/utils/interfaces/EventInterfaces';
import { TicketRequestDto } from '@/utils/interfaces/TicketInterfaces';

export default function MyTicketsPage() {
  const [filteredEvents, setFilteredEvents] = useState<EventSearchToUserDto[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const { data: session, status } = useSession();
  const user = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    const fetchUserTicketsAndEvents = async () => {
      if (session) {
        try {
          const allTickets = await fetchTickets();
          const userTickets = allTickets.filter(
            (ticket: TicketRequestDto) => ticket.userId === user?.id,
          );
          const allEvents = await fetchAllEvents();
          const eventIds = userTickets.map((ticket) => ticket.eventId);
          const userEvents = allEvents.filter((event: EventSearchToUserDto) =>
            eventIds.includes(event.id),
          );
          const ticketCounts = userTickets.reduce(
            (acc, ticket) => {
              acc[ticket.eventId] = (acc[ticket.eventId] || 0) + 1;
              return acc;
            },
            {} as { [key: number]: number },
          );
          const eventsWithTicketCount = userEvents.map((event) => ({
            ...event,
            ticketCount: ticketCounts[event.id] || 0,
          }));
          setFilteredEvents(eventsWithTicketCount);
        } catch (error) {
          console.error('Error fetching tickets or events:', error);
        }
      }
    };

    fetchUserTicketsAndEvents();
  }, [session, user]);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

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
          My Tickets
        </Typography>
        <Box mt={4}>
          <LoginPromptSection />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 3,
        display: 'flex',
        justifyContent: 'center',
        minHeight: '70vh',
      }}
    >
      <Box sx={{ maxWidth: '60%', width: '100%' }}>
        <Box display={'flex'} flexDirection={'row'} gap={1}>
          <Typography variant="h1" fontWeight={'bold'}>
            My
          </Typography>
          <Typography variant="h1" color="primary" fontWeight={'bold'}>
            Tickets
          </Typography>
        </Box>

        {filteredEvents.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={'100%'}
          >
            <EmptyTicketSection />
          </Box>
        ) : (
          <>
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
              gap={3}
            >
              {visibleEvents.map((event, index) => (
                <Box key={index}>
                  <TicketCard event={event} />
                </Box>
              ))}
            </Box>

            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(filteredEvents.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
