"use client";

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    location: string;
    attendees: number;
    activities: number;
    description?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ height: 200 }}
        image="https://i.pinimg.com/736x/f1/24/77/f124772add8643a64bcf03d9d67665fe.jpg"
        alt={event.title}
      />
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {event.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {event.description || 'Lorem ipsum description text for the event.'}
        </Typography>
        <Box display="flex" gap={2} mt={2}>
          <Typography variant="body2" color="primary">📅 {event.date}</Typography>
          <Typography variant="body2" color="primary">📍 {event.location}</Typography>
          <Typography variant="body2" color="primary">👥 {event.attendees} Attendees</Typography>
          <Typography variant="body2" color="primary">🔖 {event.activities} Activities</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
