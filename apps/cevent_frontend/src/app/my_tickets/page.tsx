'use client';

import Layout from "@/components/Layout";
import { Box, Typography } from "@mui/material";

export default function MyTicketsPage() {
  return (
    <Layout>
      <Box sx={{ height:"65vh" }}>
      <Typography color="primary" variant="h1">My Tickets</Typography>
      <Typography variant="body1">Upcoming page</Typography>
      </Box>
    </Layout>
  );
}
