import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import '../_styles/Steps.css';

interface GeneralInfoProps {
  title: string;
  shortDescription: string;
  description: string;
  category: string;
}

interface DateLocationProps {
  date?: string;
  time?: string;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
}

interface PriceCapacityProps {
  capacity: number;
  ticketPrice: number;
}

const Steps = ({
  generalInfo,
  dateLocation,
  priceCapacity,
  selectedImage,
}: {
  generalInfo: GeneralInfoProps;
  dateLocation: DateLocationProps;
  priceCapacity: PriceCapacityProps;
  selectedImage: string | null;
}) => {
  const [isGeneralInfoComplete, setIsGeneralInfoComplete] = useState(false);
  const [isDateLocationComplete, setIsDateLocationComplete] = useState(false);
  const [isPriceCapacityComplete, setIsPriceCapacityComplete] = useState(false);

  useEffect(() => {
    setIsGeneralInfoComplete(
      !!(
        generalInfo?.title &&
        generalInfo?.shortDescription &&
        generalInfo?.description &&
        generalInfo?.category
      ),
    );
    setIsDateLocationComplete(
      !!(
        dateLocation?.date &&
        dateLocation?.time &&
        dateLocation?.location &&
        dateLocation?.latitude &&
        dateLocation?.longitude
      ),
    );
    setIsPriceCapacityComplete(
      !!(priceCapacity?.capacity && priceCapacity?.ticketPrice),
    );
  }, [generalInfo, dateLocation, priceCapacity]);

  const handleSubmit = async () => {
    if (
      isGeneralInfoComplete &&
      isDateLocationComplete &&
      isPriceCapacityComplete
    ) {
      const eventData = {
        ...generalInfo,
        ...dateLocation,
        ...priceCapacity,
        coverPhotoUrl: selectedImage,
      };

      try {
        const response = await fetch(
          'http://localhost:5149/ceventservice.api/api/Event',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to create event: ${response.statusText}`);
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

  return (
    <Box mb={4} p={3}>
      <Box mb={4} p={3} className="step-container">
        <Typography variant="h6" className="checkbox-label">
          Steps
        </Typography>

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
          <Typography variant="h6" className="checkbox-label">
            Add Collaborators
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <IconButton color="primary">
              <AddCircleOutline fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Box mt={4} p={2}>
          <Typography variant="h6" className="checkbox-label">
            Set Reminder
          </Typography>
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
            disabled={
              !(
                isGeneralInfoComplete &&
                isDateLocationComplete &&
                isPriceCapacityComplete
              )
            }
          >
            Create Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Steps;