import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import UploadImageButton from '@/components/UploadImageButton';

interface ImageUploadProps {
  onComplete: (imageData: { coverPhotoUrl: string }) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onComplete }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (fileUrl: string) => {
    setUploadedImage(fileUrl);
    console.log('Image uploaded. URL:', fileUrl);
    onComplete({ coverPhotoUrl: fileUrl });
  };

  return (
    <Box className="image-upload" sx={{ textAlign: 'center', padding: '16px' }}>
      <Typography variant="h6">Upload Image</Typography>

      <UploadImageButton
        onComplete={handleImageUpload}
        variant="contained"
        textButton="Select Image"
      />

      <Box mt={2}>
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No image uploaded yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
