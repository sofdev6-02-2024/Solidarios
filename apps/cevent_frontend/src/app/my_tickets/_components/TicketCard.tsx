'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Box,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';

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

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={ticket.image}
        alt={ticket.title}
      />
      <CardContent>
        <Stack direction="row" spacing={1} mb={1}>
          <Chip label={ticket.category} color="primary" size="small" />
          <Typography variant="body2" color="text.secondary">
            <EventIcon
              sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }}
            />
            {ticket.date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <PlaceIcon
              sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }}
            />
            {ticket.location}
          </Typography>
        </Stack>
        <Typography variant="h6" component="div" gutterBottom>
          {ticket.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ticket.description}
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            {ticket.attendees} Attendees
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {ticket.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
