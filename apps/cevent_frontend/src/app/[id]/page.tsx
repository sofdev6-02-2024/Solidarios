"use client";
import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Button, Typography } from '@mui/material';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import styles from '@/styles/components/EventStyles';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import MailIcon from '@mui/icons-material/Mail';
import { format } from 'date-fns';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const EventPage = () => {
  const [eventData, setEventData] = useState<EventDetailDto | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        try {
          const response = await axios.get(
            `/api/events/${id}`
          );
          setEventData(response.data);
        } catch (error) {

        }
      };

      fetchEventData();
    }
  }, [id]);

  const formattedDate = (date: Date) => format(new Date(date), 'MMMM dd, yyyy');
  const formattedTime = (date: Date) => format(new Date(date), 'h:mm a');

  return (
    <>
    {eventData == null ? <Typography>Loading...</Typography> :
    <Card sx={styles.cardStyles}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h5" sx={styles.titleStyles}>
            {eventData.name}
          </Typography>
          <Typography variant="body2" sx={styles.chipCategoryStyles}>
            {eventData.category}
          </Typography>

          <Box sx={styles.infoSection}>
            <Box sx={styles.infoRow}>
              <EventIcon sx={styles.iconStyles} />
              <Typography variant="body2" sx={styles.labelStyles}>Date and time</Typography>
              <Typography variant="body1">{formattedDate(eventData.eventDate)}</Typography>
            </Box>

            <Box sx={styles.infoRow}>
              <LocationOnIcon sx={styles.iconStyles} />
              <Typography variant="body2" sx={styles.labelStyles}>Address</Typography>
              <Typography variant="body1" sx={styles.linkStyles}>
                {eventData.address}
              </Typography>
            </Box>

            <Typography variant="body2" sx={styles.shareTextStyles}>Share with friends</Typography>
            <Box sx={styles.iconGroup}>
              <ContentCopyOutlinedIcon sx={styles.iconShareStyles} />
              <MailIcon sx={styles.iconShareStyles} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={4} sx={styles.subscribeSection}>
          <Typography variant="h6" sx={styles.subscribeTitleStyles}>Subscribe now</Typography>
          <Box sx={styles.infoRow}>
            <PeopleOutlineIcon sx={styles.iconStyles} />
            <Typography variant="body2" sx={styles.labelStyles}>Capacity</Typography>
            <Typography variant="body1">{eventData.attendeeCount}</Typography>
          </Box>
          <Box sx={styles.infoRow}>
            <AttachMoneyIcon sx={styles.iconStyles} />
            <Typography variant="body2" sx={styles.labelStyles}>Price</Typography>
            <Typography variant="body1">${eventData.ticketPrice} USD</Typography>
          </Box>
          <Button variant="contained" color="primary" startIcon={<CalendarMonthIcon />} sx={styles.calendarButtonStyles}>
            Add to Google Calendar
          </Button>
          <Button variant="contained" color="primary" sx={styles.ticketButtonStyles}>
            Get my ticket
          </Button>
        </Grid>
      </Grid>
    </Card>}
    </>
  );
};

export default EventPage;