'use client';

import Layout from '@/components/Layout';
import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

const RedeemTicketPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <Box sx={{ minHeight: '70vh' }}>
        <Typography variant="h1">Redeem ticket</Typography>
        <Typography variant="body1">Ticket id: {id}</Typography>
      </Box>
    </Layout>
  );
};

export default RedeemTicketPage;
