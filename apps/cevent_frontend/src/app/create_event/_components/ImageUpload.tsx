import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import '../_styles/ImageUpload.css';

interface ImageUploadProps {
  selectedImage: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ selectedImage, onImageChange }) => {
  return (
    <Box className="image-upload" sx={{ textAlign: 'center', padding: '16px' }}>
      <Typography variant="h6">Upload Image</Typography>

      <Button
        variant="contained"
        color="primary"
        component="label"
        sx={{ marginBottom: '16px' }}
      >
        Select Image
        <input
          type="file"
          hidden
          onChange={onImageChange} 
        />
      </Button>

      {selectedImage ? (
        <Box>
          <img
            src={selectedImage}
            alt="Selected"
            className="selected-image"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Box>
      ) : (
        <Typography variant="body2" sx={{ color: 'gray', marginTop: '16px' }}>
          No image selected yet.
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;
