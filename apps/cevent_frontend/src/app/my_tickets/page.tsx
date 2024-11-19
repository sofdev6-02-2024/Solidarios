'use client';

import { Box, Grid, Typography, Pagination } from '@mui/material';
import { useState } from 'react';
import TicketCard from './_components/TicketCard';

export default function MyTicketsPage() {
  const tickets = Array(8).fill({
    title: 'The future conference',
    category: 'Technology',
    date: 'August 20, 2021',
    location: 'Cochabamba',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
    image: 'https://i.pinimg.com/736x/f1/24/77/f124772add8643a64bcf03d9d67665fe.jpg',
    price: '$79',
    attendees: '10',
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleTickets = tickets.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <span style={{ color: 'black' }}>My </span>
        <span style={{ color: '#1e88e5' }}>Tickets</span>
      </Typography>

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
    </Box>
  );
}
