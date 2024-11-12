'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { useParams } from 'next/navigation';
import { getEventById } from '@/services/EventService';
import CardEventInfo from './_components/CardEventInfo';
import Layout from '@/components/Layout';
import Image from 'next/image';
import styles from '@/styles/components/EventPageStyles';
import DetailsEvent from './_components/DetailsEvent';
import RelatedEvent from './_components/RelatedEvent';
const EventPage = () => {
  const [eventData, setEventData] = useState<EventDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    if (id) {
      getEventById(id.toString())
        .then((data) => {
          setEventData(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      {loading ? (
        <Typography>Loaedng{id}</Typography>
      ) : eventData !== null ? (
        <Box sx={styles.mainContainer}>
          <Box sx={styles.containerImage}>
            <Image
              src={eventData.coverPhotoUrl}
              alt="Empty"
              width={1080}
              height={480}
            />
          </Box>
          <Layout>
            <Box sx={{position: "relative", height: "220px" }}>
            <CardEventInfo eventData={eventData} />
            </Box>
            <DetailsEvent event={eventData} />
         
          </Layout>
        </Box>
      ) : (
        <Typography>Event not found</Typography>
      )}
    </>
  );
};

export default EventPage;
