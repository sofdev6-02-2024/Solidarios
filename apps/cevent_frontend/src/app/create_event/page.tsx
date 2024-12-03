'use client';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  ImageUpload,
  GeneralInfo,
  DateLocation,
  PriceCapacity,
  Activities,
  AditionalSettings,
  Steps,
} from '../../components/imports';
import { Activity } from '@/utils/interfaces/EventInterfaces';
import styles from './_styles/CreateEvent.module.css';

interface GeneralInfoData {
  title: string;
  shortDescription: string;
  description: string;
  categoryId: number;
}

interface DateLocationData {
  latitude: number | null;
  longitude: number | null;
}

interface PriceCapacityData {
  capacity: number;
  ticketPrice: number;
}

interface ImageData {
  coverPhotoUrl: string;
}

const CreateEvent = () => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoData>({
    title: '',
    shortDescription: '',
    description: '',
    categoryId: 0,
  });
  const [dateLocation, setDateLocation] = useState<DateLocationData>({
    latitude: null,
    longitude: null,
  });
  const [priceCapacity, setPriceCapacity] = useState<PriceCapacityData>({
    capacity: 0,
    ticketPrice: 0,
  });
  const [imageData, setImageData] = useState<ImageData>({
    coverPhotoUrl: '',
  });
  const [activities, setActivities] = useState<Activity[]>([]);

  const handleImageChange = (data: ImageData) => {
    setImageData(data);
  };

  const handleGeneralInfoComplete = (data: GeneralInfoData) => {
    setGeneralInfo(data);
  };

  const handleDateLocationComplete = (data: DateLocationData) => {
    setDateLocation(data);
  };

  const handlePriceCapacityComplete = (data: PriceCapacityData) => {
    setPriceCapacity(data);
  };

  const handleAddActivity = (newActivity: Activity) => {
    setActivities([...activities, newActivity]);
  };

  const handleEditActivity = (index: number, updatedActivity: Activity) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = updatedActivity;
    setActivities(updatedActivities);
  };

  const handleDeleteActivity = (index: number) => {
    const updatedActivities = activities.filter((_, idx) => idx !== index);
    setActivities(updatedActivities);
  };

  return (
    <Box className={styles.container} display="flex">
      <Box flex={4} pr={2}>
        <Box mb={2}>
          <Typography variant="h4" fontWeight="bold">
            <span style={{ color: 'black' }}>Create</span>
            <span style={{ color: '#4a88e9' }}> Event</span>
          </Typography>
        </Box>

        <ImageUpload
          onComplete={handleImageChange}
          //initialImage="https://upcdn.io/W142it7/raw/uploads/2024/12/03/4k9xqXFT7Y-guardabarros-delantero-honda-1.jpg"
        />

        <GeneralInfo
          onComplete={handleGeneralInfoComplete}
          /*initialData={{
            title: 'Tech Conference 2024',
            shortDescription: 'An event about the latest in tech.',
            description: 'Join us for a deep dive into the future of technology.',
            categoryId: 1,
          }}*/
        />

        <DateLocation
          onComplete={handleDateLocationComplete}
          /*initialData={{
            date: new Date('2024-12-25'),
            time: '14:30',
            location: 'Central Park, New York',
            latitude: 40.785091,
            longitude: -73.968285,
          }}*/
        />

        <PriceCapacity
          onComplete={handlePriceCapacityComplete}
          /*initialData={{
            capacity: 100,
            ticketPrice: 50,
          }}*/
        />

        <Activities
          /*initialActivities={[
            {
              name: 'Opening Ceremony',
              description: 'The grand opening of the event.',
              startTime: new Date('2024-12-01T10:00:00'),
              endTime: new Date('2024-12-01T11:00:00'),
              status: 1,
              capacity: 100,
            },
            {
              name: 'Opening Ceremony',
              description: 'The grand opening of the event.',
              startTime: new Date('2024-12-01T10:00:00'),
              endTime: new Date('2024-12-01T11:00:00'),
              status: 1,
              capacity: 100,
            },
          ]}*/
          onAddActivity={handleAddActivity}
          onEditActivity={handleEditActivity}
          onDeleteActivity={handleDeleteActivity}
        />
        <AditionalSettings />
      </Box>

      <Box flex={1} pl={2}>
        <Steps
          generalInfo={generalInfo}
          dateLocation={dateLocation}
          priceCapacity={priceCapacity}
          selectedImage={imageData.coverPhotoUrl}
          activities={activities}
        />
      </Box>
    </Box>
  );
};

export default CreateEvent;
