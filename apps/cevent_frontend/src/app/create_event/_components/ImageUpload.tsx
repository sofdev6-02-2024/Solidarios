import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../_styles/ImageUpload.css';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const onImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      await uploadImageToFirebase(file);
    }
  };

  const uploadImageToFirebase = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <Box className="image-upload">
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
        <Box>
          <img src={selectedImage} alt="Selected" className="selected-image" />
        </Box>
      )}

      {imageUrl && (
        <Box mt={2}>
          <Typography variant="body2">Image URL:</Typography>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;