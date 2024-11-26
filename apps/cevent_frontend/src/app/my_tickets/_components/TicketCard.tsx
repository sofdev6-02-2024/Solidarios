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
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
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
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={event.coverPhotoUrl}
        alt={event.name}
        sx={{
          position: 'relative',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 155,
          right: 8,
          zIndex: 1,          
        }}
      >
        {event.ticketCount > 1 && (
          <Chip
            label={<><ConfirmationNumberIcon sx={{ fontSize: 14, mr: 0.5 }} />{event.ticketCount}</>}
            color="secondary"
            sx={{ ml: 1 }}
          />
        )}

        <Chip label={`$${event.ticketPrice}`} color="primary" />
      </Box>

      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {event.name}
        </Typography>
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
        <Typography variant="body2" color="text.secondary">
          {event.shortDescription}
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
        </Box>
      </CardContent>
    </Card>
  );
}