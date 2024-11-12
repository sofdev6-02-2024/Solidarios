import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { Box, Typography } from '@mui/material';

interface DetailsEventProps {
  event: EventDetailDto;
}
const DetailsEvent = ({ event }: DetailsEventProps) => {
  return (
    <Box>
      <Box>
        <Typography variant="h3">Event Details</Typography>
        <Typography variant="body">{event.description}</Typography>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default DetailsEvent;
