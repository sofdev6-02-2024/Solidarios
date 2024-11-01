"use client";

import React, { useState } from 'react';
import { Box,Typography  } from '@mui/material';
import ImageUpload from './_components/ImageUpload';
import GeneralInfo from './_components/GeneralInfo';
import DateLocation from './_components/DateLocation';
import PriceCapacity from './_components/PriceCapacity';
import Activities from './_components/Activities';
import Steps from './_components/Steps';
import AditionalSettings from './_components/AditionalSettings';
import styles from './_styles/CreateEvent.module.css';

const CreateEvent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
        <GeneralInfo />
        <DateLocation />
        <PriceCapacity />
        <Activities />
        <AditionalSettings />
      </Box>

      <Box flex={1} pl={2}>
        <Steps />
      </Box>
    </Box>
  );
};

export default CreateEvent;
