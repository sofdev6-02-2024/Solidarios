'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from '@mui/material';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    location: string;
    attendees: number;
    activities: number;
    description?: string;
    price?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 4,
        boxShadow: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: '100%', height: '300px', objectFit: 'cover' }}
        image="https://i.pinimg.com/736x/f1/24/77/f124772add8643a64bcf03d9d67665fe.jpg"
        alt={event.title}
      />

      <CardContent
        sx={{
          paddingTop: '1rem',
          paddingLeft: '2rem',
          paddingRight: '8rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="textSecondary"
            mb={2}
          >
            {event.title || 'Lorem ipsum description text for the event.'}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {event.description ||
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur unde eveniet laborum, culpa aut minus accusamus sed repellendus incidunt quisquam consectetur.'}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            textAlign: 'start',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '16px',
              padding: '0.25rem 0.75rem',
              fontWeight: 'bold',
              display: 'inline-block',
              alignSelf: 'start',
            }}
          >
            Tecnología
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: '#F2F2F2',
              color: 'black',
              borderRadius: '16px',
              padding: '0.25rem 0.75rem',
              display: 'inline-block',
              alignSelf: 'start',
            }}
          >
            📅 {event.date}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: '#F2F2F2',
              color: 'black',
              borderRadius: '16px',
              padding: '0.25rem 0.75rem',
              display: 'inline-block',
              alignSelf: 'start',
            }}
          >
            📍 {event.location}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: '#F2F2F2',
              color: 'black',
              borderRadius: '16px',
              padding: '0.25rem 0.75rem',
              display: 'inline-block',
              alignSelf: 'start',
            }}
          >
            👥 {event.attendees} Attendees
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: '#F2F2F2',
              color: 'black',
              borderRadius: '16px',
              padding: '0.25rem 0.75rem',
              display: 'inline-block',
              alignSelf: 'start',
            }}
          >
            🔖 Activities: {event.activities}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: '#F2F2F2',
              color: 'black',
              borderRadius: '16px',
              padding: '0.25rem 0.75rem',
              display: 'inline-block',
              alignSelf: 'start',
            }}
          >
            💵 {event.price || '$79'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
