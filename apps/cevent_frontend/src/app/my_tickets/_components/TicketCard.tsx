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
import { EventSearchToUserDto } from '@/utils/interfaces/EventInterfaces';

interface TicketCardProps {
  event: EventSearchToUserDto;
}

export default function TicketCard({ event }: TicketCardProps) {
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
        image={event.coverPhotoUrl}
        alt={event.name} 
      />
      <CardContent>
        <Stack direction="row" spacing={1} mb={1}>
          <Chip label={event.capacity} color="primary" size="small" /> 
          <Typography variant="body2" color="text.secondary">
            <EventIcon
              sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }}
            />
            {new Date(event.eventDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <PlaceIcon
              sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }}
            />
            {event.venue} 
          </Typography>
        </Stack>
        <Typography variant="h6" component="div" gutterBottom>
          {event.name} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.shortDescription} 
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            {event.attendeeCount} Attendees 
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            ${event.ticketPrice.toFixed(2)} 
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
