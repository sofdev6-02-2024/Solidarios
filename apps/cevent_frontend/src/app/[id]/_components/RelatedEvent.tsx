import { EventCategory } from '@/utils/interfaces/Categories';
import { Box, Typography } from '@mui/material';

interface RelatedEvetnsProps {
  category: EventCategory;
}

const RelatedEvent = ({ category }: RelatedEvetnsProps) => {
  return (
    <Box>
      <Typography variant="h3">Related Events</Typography>
    </Box>
  );
};

export default RelatedEvent;
