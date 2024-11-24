'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  ButtonBase,
} from '@mui/material';
import { formatDate } from '@/utils/methods/stringMethods';
import { EventCardProps } from '@/utils/interfaces/SearchEventsOfUsers';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/navigation/Routes';

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  return (
    <ButtonBase
      sx={{ height: 'auto' }}
      onClick={() => router.push(`${routes.myEvents}/${event.id}`)}
    >
      <Card>
        <CardMedia
          component="img"
          sx={{ width: '100%', height: '300px', objectFit: 'cover' }}
          image={event.coverPhotoUrl}
          alt={event.name}
        />

        <CardContent
          sx={{
            paddingTop: '1.5rem',
            paddingLeft: '2rem',
            paddingRight: '5rem',
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
              {event.name || 'Lorem ipsum description text for the event.'}
            </Typography>
            <Typography variant="body1" color="textSecondary">
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
              📅 {formatDate(event.createdAt)}
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
              📍 {event.venue}
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
              👥 {event.attendees ?? 0}
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
              🔖 Activities: 0 {event.activities ?? 0}
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
    </ButtonBase>
  );
}
