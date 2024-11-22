'use client';
import Layout from '@/components/Layout';
import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LateralBar from './_components/LateralBar';
import { ManagementSections } from '@/utils/interfaces/EventManagement';
import HomeSection from './_components/Sections/HomeSection';
import ActivitiesSection from './_components/Sections/ActivitiesSection';
import AttendanceListSection from './_components/Sections/AttendanceListSection';
import PromoteEventSection from './_components/Sections/PromoteEventSection';
import EditEventSection from './_components/Sections/EditEventSection';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { getEventById } from '@/services/EventService';

const EventManagementPage = () => {
  const { id } = useParams();
  const [section, setSection] = useState(ManagementSections.Home);
  const [event, setEvent] = useState<EventDetailDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getEventById(id.toString())
        .then((response) => {
          if (response) {
            setEvent(response);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      sx={{ minHeight: '80vh', width: '100%' }}
    >
      <LateralBar value={section} setValue={setSection} />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : event ? (
        <>
          {section === ManagementSections.Home && <HomeSection event={event} />}
          {section === ManagementSections.Activities && <ActivitiesSection />}
          {section === ManagementSections.AttendanceList && (
            <AttendanceListSection />
          )}
          {section === ManagementSections.PromoteEvent && (
            <PromoteEventSection />
          )}
          {section === ManagementSections.EditEvent && <EditEventSection />}
        </>
      ) : (
        <Typography variant="h6">Event not found</Typography>
      )}
    </Box>
  );
};

export default EventManagementPage;
