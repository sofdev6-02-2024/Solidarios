"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import ImageUpload from './_components/ImageUpload';
import GeneralInfo from './_components/GeneralInfo';
import DateLocation from './_components/DateLocation';
import PriceCapacity from './_components/PriceCapacity';
import Activities from './_components/Activities';
import AdditionalSettings from './_components/AdditionalSettings';
import Sidebar from './_components/Sidebar';
import './_styles/CreateEvent.module.css';

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
    <Box>
      <ImageUpload selectedImage={selectedImage} onImageChange={handleImageChange} />
      <GeneralInfo />
      <DateLocation />
      <PriceCapacity />
      <Activities />
      <AdditionalSettings />
      <Sidebar />
    </Box>
  );
};

export default CreateEvent;
