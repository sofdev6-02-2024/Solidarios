'use client';

import {
  Box,
  Grid,
  Typography,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import TicketCard from './_components/TicketCard';
import LoginPromptSection from './_components/LoginPromptSection';
import EmptyTicketSection from './_components/EmptyTicketSection';

interface Ticket {
  image: string;
  category: string;
  date: string;
  location: string;
  title: string;
  description: string;
  attendees: number;
  price: string;
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      setTickets([]);
    }
  }, [session]);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleTickets = tickets.slice(startIndex, endIndex);

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
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <span style={{ color: 'black' }}>My </span>
        <span style={{ color: '#1e88e5' }}>Tickets</span>
      </Typography>

      {tickets.length === 0 ? (
        <Box mt={4}>
          <EmptyTicketSection />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {visibleTickets.map((ticket, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TicketCard ticket={ticket} />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={Math.ceil(tickets.length / itemsPerPage)}
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
