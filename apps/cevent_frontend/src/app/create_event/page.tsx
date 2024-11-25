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
} from './_components/imports';
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

const CreateEvent = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
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
          selectedImage={selectedImage}
          onImageChange={handleImageChange}
        />
        <GeneralInfo onComplete={handleGeneralInfoComplete} />
        <DateLocation onComplete={handleDateLocationComplete} />
        <PriceCapacity onComplete={handlePriceCapacityComplete} />
        <Activities
          onAddActivity={(newActivity) =>
            //TODO: Add implementation
            console.log('Nueva actividad agregada:', newActivity)
          }
        />
        <AditionalSettings />
      </Box>

      <Box flex={1} pl={2}>
        <Steps
          generalInfo={generalInfo}
          dateLocation={dateLocation}
          priceCapacity={priceCapacity}
          selectedImage={selectedImage}
        />
      </Box>
    </Box>
  );
};

export default CreateEvent;
