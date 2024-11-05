import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import {
  extractWordByComma,
  formatDate,
  truncateText,
} from '@/utils/methods/stringMethods';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import styles from '@/styles/components/CardEventStyles';
import { useEffect } from 'react';

interface CardEventProps {
  eventData: EventHomePageDto;
}

const CardEvent = ({ eventData }: CardEventProps) => {
  useEffect (() => {
    console.log('CardEvent rendered');
    console.log(eventData);
  }, [eventData]);

  return (
    <Card sx={styles.cardStyles}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={eventData.coverPhotoUrl}
          alt={eventData.name}
        />
        <Chip
          icon={<PeopleOutlineIcon color="primary" sx={{ fontSize: 16 }} />}
          label={eventData.attendeeCount}
          sx={styles.chipAttendeeCountStyles}
        />
        <Chip
          icon={<AttachMoneyIcon sx={{ fontSize: 16 }} />}
          label={eventData.ticketPrice}
          color="primary"
          sx={styles.chipPriceStyles}
        />
        <CardContent sx={styles.cardContentStyles}>
          <Typography variant="bodyLarge" sx={{ fontWeight: 'bold' }}>
            {eventData.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip
              color="primary"
              label={eventData.category}
              sx={styles.chipCategoryStyles}
            />
            <Chip
              icon={<EventIcon color="primary" sx={{ fontSize: 16 }} />}
              label={formatDate(eventData.eventDate)}
              sx={styles.chipEventDateStyles}
            />
            <Chip
              icon={<LocationOnIcon color="primary" sx={{ fontSize: 16 }} />}
              label={extractWordByComma(eventData.address, 2)}
              sx={styles.chipLocationStyles}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {truncateText(eventData.description, 120)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardEvent;
