'use client';

import { Box, Typography, Pagination, CircularProgress } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; // Importación de Grid2
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import TicketCard from './_components/TicketCard';
import LoginPromptSection from './_components/LoginPromptSection';
import EmptyTicketSection from './_components/EmptyTicketSection';
import { fetchAllEvents } from '@/services/EventService';
import { EventSearchToUserDto } from '@/utils/interfaces/EventInterfaces';

interface TicketData {
  TicketId: string;
  EventId: number;
  UserId: string;
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [events, setEvents] = useState<EventSearchToUserDto[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventSearchToUserDto[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const { data: session, status } = useSession();
  const user = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (session) {
      const mockTickets: TicketData[] = [
        { TicketId: '1', EventId: 1002, UserId: 'a11d80f5-320e-4e03-8fb7-32657778db78' },
        { TicketId: '2', EventId: 1003, UserId: 'a11d80f5-320e-4e03-8fb7-32657778db78' },
        { TicketId: '3', EventId: 1003, UserId: 'a11d80f5-320e-4e03-8fb7-32657778db78' },
        { TicketId: '4', EventId: 1004, UserId: 'a11d80f5-320e-4e03-8fb7-32657778db78' },
      ];
      setTickets(mockTickets);
    }

    const fetchEvents = async () => {
      const allEvents = await fetchAllEvents();
      setEvents(allEvents);

      if (session) {
        const userTickets = tickets.filter(ticket => ticket.UserId === user?.id);
        const eventIds = userTickets.map(ticket => ticket.EventId);
        const filtered = allEvents.filter(event => eventIds.includes(event.EventId));
        setFilteredEvents(filtered);
      }
    };

    fetchEvents();
  }, []);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
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
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <span style={{ color: 'black' }}>My </span>
        <span style={{ color: '#1e88e5' }}>Tickets</span>
      </Typography>

      {filteredEvents.length === 0 ? (
        <Box mt={4}>
          <EmptyTicketSection />
        </Box>
      ) : (
        <>
          <Grid2 container spacing={3}>
            {visibleEvents.map((event, index) => (
              <Grid2 xs={12} sm={6} key={index}>
                <TicketCard event={event} />
              </Grid2>
            ))}
          </Grid2>

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
  );
}