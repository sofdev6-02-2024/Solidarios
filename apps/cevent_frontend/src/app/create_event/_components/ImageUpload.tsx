"use client";

import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const ImageUpload = ({ selectedImage, onImageChange }) => {
  return (
    <Box mt={2} mb={4} textAlign="center" className="image-upload">
      <Typography variant="body1">Upload Image</Typography>
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        style={{ display: 'none' }}
        id="upload-image"
      />
      <label htmlFor="upload-image">
        <Button variant="contained" component="span">
          Choose File
        </Button>
      </label>
      {selectedImage && (
        <Box mt={2}>
          <img
            src={selectedImage}
            alt="Selected"
            className="selected-image"
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;