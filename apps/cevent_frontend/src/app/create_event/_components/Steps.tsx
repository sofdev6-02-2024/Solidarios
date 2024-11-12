import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, IconButton, TextField, Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import '../_styles/Steps.css';

const Steps = ({
  generalInfo,
  dateLocation,
  priceCapacity,
  selectedImage
}) => {
  const [isGeneralInfoComplete, setIsGeneralInfoComplete] = useState(false);
  const [isDateLocationComplete, setIsDateLocationComplete] = useState(false);
  const [isPriceCapacityComplete, setIsPriceCapacityComplete] = useState(false);

  useEffect(() => {
    console.log('General Info:', generalInfo);
    console.log('Title exists:', !!generalInfo?.title);
    console.log('Short Description exists:', !!generalInfo?.shortDescription);
    console.log('Description exists:', !!generalInfo?.description);
    console.log('Category exists:', !!generalInfo?.category);

    const isGeneralInfoComplete = generalInfo?.title && generalInfo?.shortDescription && generalInfo?.description && generalInfo?.category;
    setIsGeneralInfoComplete(isGeneralInfoComplete);
    console.log('isGeneralInfoComplete:', isGeneralInfoComplete);

    console.log('Date Location:', dateLocation);
    console.log('Date exists:', !!dateLocation?.date);
    console.log('Time exists:', !!dateLocation?.time);
    console.log('Location exists:', !!dateLocation?.location);

    const isDateLocationComplete = dateLocation?.date && dateLocation?.time && dateLocation?.location;
    setIsDateLocationComplete(isDateLocationComplete);
    console.log('isDateLocationComplete:', isDateLocationComplete);

    console.log('Price Capacity:', priceCapacity);
    console.log('Capacity exists:', !!priceCapacity?.capacity);
    console.log('Ticket Price exists:', !!priceCapacity?.ticketPrice);

    const isPriceCapacityComplete = priceCapacity?.capacity && priceCapacity?.ticketPrice;
    setIsPriceCapacityComplete(isPriceCapacityComplete);
    console.log('isPriceCapacityComplete:', isPriceCapacityComplete);

  }, [generalInfo, dateLocation, priceCapacity]);


  const handleSubmit = async () => {
    if (isGeneralInfoComplete && isDateLocationComplete && isPriceCapacityComplete) {
      console.log('General Info:', generalInfo);
      console.log('Date and Location:', dateLocation);
      console.log('Price and Capacity:', priceCapacity);
      console.log('Selected Image:', selectedImage);

      const eventData = {
        ...generalInfo,
        ...dateLocation,
        ...priceCapacity,
        coverPhotoUrl: selectedImage,
      };

      try {
        const response = await fetch('http://localhost:5149/ceventservice.api/api/Event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) {
          throw new Error('Failed to create event');
        }

        const result = await response.json();
        console.log('Event created:', result);
      } catch (error) {
        console.error('Error creating event:', error);
      }
    } else {
      console.log('Please complete all fields before submitting');
    }
  };

  console.log('isGeneralInfoComplete:', isGeneralInfoComplete);
  console.log('isDateLocationComplete:', isDateLocationComplete);
  console.log('isPriceCapacityComplete:', isPriceCapacityComplete);

  return (
    <Box mb={4} p={3}>
      <Box mb={4} p={3} className="step-container">
        <Typography variant="h6" className="checkbox-label">Steps</Typography>

        <FormControlLabel
          control={<Checkbox checked={isGeneralInfoComplete} />}
          label="General information"
        />
        <FormControlLabel
          control={<Checkbox checked={isDateLocationComplete} />}
          label="Date and location"
        />
        <FormControlLabel
          control={<Checkbox checked={isPriceCapacityComplete} />}
          label="Price and capacity"
        />
      </Box>

      <Box className="reminder-container">
        <Box mt={4} p={2}>
          <Typography variant="h6" className="checkbox-label">Add Collaborators</Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <IconButton color="primary">
              <AddCircleOutline fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Box mt={4} p={2}>
          <Typography variant="h6" className="checkbox-label">Set Reminder</Typography>
          <TextField
            label="Filter options"
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="create-event-button"
            onClick={handleSubmit}

          >
            Create Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Steps;