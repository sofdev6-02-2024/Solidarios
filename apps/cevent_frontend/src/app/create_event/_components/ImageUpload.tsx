import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import '../_styles/ImageUpload.css';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const onImageChange = () => {
    const url =
      'https://images.wallpaperscraft.com/image/single/halloween_holiday_headless_horseman_62756_1280x720.jpg';
    setSelectedImage(url);
  };

  return (
    <Box className="image-upload">
      <Typography variant="body1">Upload Image</Typography>

      <Button variant="contained" onClick={onImageChange}>
        Use Static Image
      </Button>

      {selectedImage && (
        <Box>
          <img src={selectedImage} alt="Selected" className="selected-image" />
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
