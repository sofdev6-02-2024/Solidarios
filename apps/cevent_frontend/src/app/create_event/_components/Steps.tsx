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
import { createEvent } from '@/utils/../services/EventService';
import '../_styles/Steps.css';
import { EventInputDto } from '@/utils/interfaces/EventInterfaces';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/navigation/Routes';

export interface GeneralInfoProps {
  title: string;
  shortDescription: string;
  description: string;
  categoryId: number;
}

export interface DateLocationProps {
  date?: Date;
  time?: string;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface PriceCapacityProps {
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

  const router = useRouter();

  useEffect(() => {
    setIsGeneralInfoComplete(
      !!(
        generalInfo?.title &&
        generalInfo?.shortDescription &&
        generalInfo?.description &&
        generalInfo?.categoryId
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

  const user = useSelector((state: RootState) => state.user.userInfo);

  const handleSubmit = async () => {
    if (
      isGeneralInfoComplete &&
      isDateLocationComplete &&
      isPriceCapacityComplete
    ) {
      const eventData: EventInputDto = {
        name: generalInfo.title ?? '',
        shortDescription: generalInfo.shortDescription ?? '',
        description: generalInfo.description ?? '',
        categoryId: generalInfo.categoryId ?? 0,
        eventDate: dateLocation.date ?? new Date(),
        location: {
          latitude: dateLocation.latitude ?? 0,
          longitude: dateLocation.longitude ?? 0,
        },
        venue: dateLocation.location || '',
        ticketPrice: priceCapacity.ticketPrice,
        coverPhotoUrl:
          selectedImage ||
          'https://i.postimg.cc/XvfZ2cSP/47b39a54d7fa589dd5cf851ee1d2fb61.jpg',
        attendanceTrackingEnabled: false,
        status: 1,
        capacity: priceCapacity.capacity,
        organizerUserId: user?.id ?? '',
        createdAt: new Date(),
        address: dateLocation.location || '',
        attendeeCount: 0,
      };

      try {
        const response = await createEvent(eventData);
        if (response === null) {
          console.error('Error creating event:', response);
        } else {
          router.push(routes.myEvents);
        }
      } catch (error) {
        console.error('Unexpected error creating event:', error);
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
