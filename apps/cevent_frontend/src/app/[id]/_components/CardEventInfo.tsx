import {
  Card,
  Box,
  Typography,
  Button,
  ButtonBase,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import styles from '@/styles/components/EventStyles';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { formatDate } from '@/utils/methods/stringMethods';
interface CardEventInfoProps {
  eventData: EventDetailDto;
}
const CardEventInfo = ({ eventData }: CardEventInfoProps) => {
  return (
    <Card sx={styles.cardStyles}>
      <Grid display="flex" justifyContent="space-between" container spacing={1}>
        <Grid size={8}>
          <Typography variant="h5" sx={styles.titleStyles}>
            {eventData.name}
          </Typography>
          <Typography variant="body2" sx={styles.chipCategoryStyles}>
            {eventData.category}
          </Typography>

          <Box sx={styles.infoSection}>
            <Box sx={styles.infoColumn}>
              <Box sx={styles.infoRow}>
                <EventIcon sx={styles.iconStyles} />
                <Typography variant="body2" sx={styles.labelStyles}>
                  Date and time
                </Typography>
              </Box>
              <Typography variant="body">
                {formatDate(eventData.eventDate)}
              </Typography>
            </Box>
            <Box sx={styles.infoColumn}>
              <Box sx={styles.infoRow}>
                <LocationOnIcon sx={styles.iconStyles} />
                <Typography variant="body2" sx={styles.labelStyles}>
                  Address
                </Typography>
              </Box>
              <Box>
                <ButtonBase sx={styles.textClickable}>
                  <Typography variant="body1" sx={styles.linkStyles}>
                    {eventData.address}
                  </Typography>
                </ButtonBase>
              </Box>
            </Box>
            <Typography variant="body2" sx={styles.shareTextStyles}>
              Share with friends
            </Typography>
            <Box sx={styles.iconGroup}>
              <IconButton>
                <ContentCopyOutlinedIcon sx={styles.iconShareStyles} />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        <Grid size="auto" sx={styles.subscribeSection}>
          <Typography variant="h2" sx={styles.subscribeTitleStyles}>
            Subscribe now
          </Typography>
          <Box sx={styles.dataRow}>
            <Box sx={styles.infoRow}>
              <PeopleOutlineIcon sx={styles.iconStyles} />
              <Typography variant="bodyLarge" sx={styles.labelStyles}>
                Capacity
              </Typography>
            </Box>
            <Typography variant="bodyLarge">{eventData.capacity}</Typography>
          </Box>

          <Box sx={styles.dataRow}>
            <Box sx={styles.infoRow}>
              <AttachMoneyIcon sx={styles.iconStyles} />
              <Typography variant="bodyLarge" sx={styles.labelStyles}>
                Price
              </Typography>
            </Box>
            <Typography variant="bodyLarge">
              {eventData.ticketPrice} USD
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            startIcon={<CalendarMonthIcon />}
            sx={styles.calendarButtonStyles}
          >
            Add to Google Calendar
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={styles.ticketButtonStyles}
          >
            Get my ticket
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardEventInfo;