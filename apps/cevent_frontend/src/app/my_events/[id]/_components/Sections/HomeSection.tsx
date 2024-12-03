import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  ButtonBase,
  IconButton,
  Toolbar,
  MenuItem,
  Select,
  SelectChangeEvent,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import QRCodeIcon from '@mui/icons-material/QrCodeScanner';

import { stylesPage } from '../../_styles/homeEventSectionStyle';
import { EventDetailDto, mapStatus } from '@/utils/interfaces/EventInterfaces';
import { fullFormatDate } from '@/utils/methods/stringMethods';

interface SectionProps {
  event: EventDetailDto;
}

const HomeSection = ({ event }: SectionProps) => {
  const [eventStatus, setEventStatus] = useState('Pending');
  const [displayedStatus, setDisplayedStatus] = useState(
    `Status: ${mapStatus[event.status]}`,
  );

  useEffect(() => {
    setDisplayedStatus(`Status: ${eventStatus}`);
  }, [eventStatus]);

  const handleStatusChange = (e: SelectChangeEvent) => {
    setEventStatus(e.target.value);
  };

  const handleOpenMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${event.location.latitude},${event.location.longitude}`,
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard');
  };

  return (
    <Box sx={stylesPage.container}>
      <Toolbar />
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
        <Typography color="primary" variant="display">
          Event
        </Typography>
        <Typography variant="display">Management</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={8}>
          <Card sx={stylesPage.cardStyles}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography variant="h5" sx={stylesPage.titleStyles}>
                  {event.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={stylesPage.chipCategoryStyles}>
                    {event.category.keyWord}
                  </Box>
                  <Chip
                    sx={stylesPage.ongoingStatusChip}
                    label={displayedStatus}
                  />
                </Box>
                <Box
                  mt={2}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={stylesPage.infoRow}>
                      <EventIcon sx={stylesPage.iconStyles} />
                      <Typography variant="body2" sx={stylesPage.labelStyles}>
                        Date and Time
                      </Typography>
                    </Box>
                    <Typography>{fullFormatDate(event.eventDate)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={stylesPage.infoRow}>
                      <LocationOnIcon sx={stylesPage.iconStyles} />
                      <Typography variant="body2" sx={stylesPage.labelStyles}>
                        Address
                      </Typography>
                    </Box>
                    <ButtonBase
                      onClick={handleOpenMap}
                      sx={{
                        textAlign: 'left',
                        padding: 0,
                        marginLeft: '-4px',
                        width: 'fit-content',
                        display: 'inline-flex',
                      }}
                    >
                      <Typography variant="body1" sx={stylesPage.linkStyles}>
                        {event.address}
                      </Typography>
                    </ButtonBase>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={stylesPage.infoRow}>
                      <Typography variant="body2">
                        Share with friends
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={handleCopyLink}
                      sx={stylesPage.iconStyles}
                    >
                      <ContentCopyOutlinedIcon sx={stylesPage.iconStyles} />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <Grid
                size={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  component="img"
                  src={event.coverPhotoUrl}
                  alt="Event cover"
                  sx={{ width: '100%', height: 'auto', borderRadius: 4 }}
                />
              </Grid>
            </Grid>
          </Card>

          <Box mt={3}>
            <Card
              sx={{
                padding: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Event Status</Typography>
              <Select
                value={eventStatus}
                onChange={handleStatusChange}
                sx={{ width: '150px' }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Postponed">Postponed</MenuItem>
                <MenuItem value="InProgress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="OnHold">On Hold</MenuItem>
              </Select>
            </Card>
          </Box>

          <Box mt={3}>
            <Typography variant="h6">Ticket Information</Typography>
            <Grid container spacing={2} mt={1}>
              <Grid size={6}>
                <Card sx={stylesPage.ticketCard}>
                  <Typography>Tickets Sold</Typography>
                  <Typography>{event.attendeeCount}</Typography>
                </Card>
              </Grid>
              <Grid size={6}>
                <Card sx={stylesPage.ticketCard}>
                  <Typography>Tickets Redeemed</Typography>
                  <Typography>{event.attendeeCount}</Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid size={4}>
          <Card sx={stylesPage.validateCard}>
            <Typography variant="body1" align="left">
              Validate Tickets
            </Typography>
            <QRCodeIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography variant="body1" mt={2} align="center">
              Scan tickets to allow access to your event
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={stylesPage.ticketButtonStyles}
            >
              Scan Tickets
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeSection;
