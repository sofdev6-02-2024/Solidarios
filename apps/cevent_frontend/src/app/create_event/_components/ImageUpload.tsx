import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import '../_styles/ImageUpload.css';

interface ImageUploadProps {
  selectedImage: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DEFAULT_IMAGE =
  'https://i.pinimg.com/736x/d3/ba/c7/d3bac7eeb95da380710ff1fd7c4c4068.jpg';

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
