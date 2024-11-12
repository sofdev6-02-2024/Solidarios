import { Box, Button, ButtonBase, Chip, Typography } from '@mui/material';
import styles from '@/styles/components/MiniBannerStyles';
import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import Image from 'next/image';
import { formatDate, truncateText } from '@/utils/methods/stringMethods';
import EventIcon from '@mui/icons-material/Event';

const MiniBannerEvent = ({ event }: { event: EventHomePageDto }) => {
  return (
    <ButtonBase sx={styles.mainContainer}>
      <Box sx={styles.imageContainer}>
        <Image
          src={'https://i.postimg.cc/d0FXZRv9/Vista-perro-900x743-c-center.jpg'}
          alt={event.name}
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Box sx={styles.dataEventContainer}>
        <Box sx={styles.dataContainer}>
          <Typography variant="h3" sx={styles.textTitle}>
            {event.name.toUpperCase()}
          </Typography>
          <Box sx={styles.chipContainer}>
            <Chip color="primary" label={event.category} />
            <Chip
              icon={<EventIcon color="primary" sx={{ fontSize: 16 }} />}
              label={formatDate(event.eventDate)}
              sx={styles.dateChip}
            />
          </Box>
          <Typography variant="body" sx={styles.textDescription}>
            {truncateText(event.description, 200)}
          </Typography>
          <Button variant="contained" sx={styles.buttonMoreInfo}>
            More info
          </Button>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default MiniBannerEvent;
