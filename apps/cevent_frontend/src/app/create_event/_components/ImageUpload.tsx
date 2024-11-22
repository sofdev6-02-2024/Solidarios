import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ImageUploadProps } from '@/utils/interfaces/CreateEvent';
import '../_styles/ImageUpload.css';

const DEFAULT_IMAGE =
  'https://i.postimg.cc/XvfZ2cSP/47b39a54d7fa589dd5cf851ee1d2fb61.jpg';

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedImage,
  onImageChange,
}) => {
  const imageToShow = selectedImage || DEFAULT_IMAGE;

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
        <input type="file" hidden onChange={onImageChange} />
      </Button>

      <Box>
        <img
          src={imageToShow}
          alt="Selected"
          className="selected-image"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </Box>
    </Box>
  );
};

export default ImageUpload;
