"use client";

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  ImageUpload,
  GeneralInfo,
  DateLocation,
  PriceCapacity,
  Activities,
  Steps,
  AditionalSettings
} from './_components/imports';
import styles from './_styles/CreateEvent.module.css';

const CreateEvent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isGeneralInfoComplete, setIsGeneralInfoComplete] = useState(false);
  const [isDateLocationComplete, setIsDateLocationComplete] = useState(false);
  const [isPriceCapacityComplete, setIsPriceCapacityComplete] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleGeneralInfoComplete = (isComplete) => {
    setIsGeneralInfoComplete(isComplete);
  };

  const handleDateLocationComplete = (isComplete) => {
    setIsDateLocationComplete(isComplete);
  };

  const handlePriceCapacityComplete = (isComplete) => {
    setIsPriceCapacityComplete(isComplete);
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

        <ImageUpload selectedImage={selectedImage} onImageChange={handleImageChange} />
        <GeneralInfo onComplete={handleGeneralInfoComplete} />
        <DateLocation onComplete={handleDateLocationComplete} />
        <PriceCapacity onComplete={handlePriceCapacityComplete} />
        <Activities />
        <AditionalSettings />
      </Box>

      <Box flex={1} pl={2}>
        <Steps
          isGeneralInfoComplete={isGeneralInfoComplete}
          isDateLocationComplete={isDateLocationComplete}
          isPriceCapacityComplete={isPriceCapacityComplete}
        />
      </Box>
    </Box>
  );
};

export default CreateEvent;