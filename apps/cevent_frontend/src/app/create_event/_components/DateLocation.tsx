import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, TextField, InputAdornment, Modal } from '@mui/material';
import { CalendarToday, AccessTime, LocationOn } from '@mui/icons-material';
import Calendar from 'react-calendar';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import '../_styles/DateLocation.css';

const DateLocation = ({ onComplete }) => {
  const [fields, setFields] = useState({
    date: new Date(),
    time: '',
    location: '',
    latitude: null,
    longitude: null,
  });

  const [mapState, setMapState] = useState({
    openDateModal: false,
    openTimeModal: false,
    mapCenter: { lat: -17.366198, lng: -66.175489 },
    markerPosition: { lat: -17.366198, lng: -66.175489 },
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    const isDateValid = fields.date && !isNaN(fields.date.getTime());
    const isTimeValid = fields.time && /^[0-9]{2}:[0-9]{2}$/.test(fields.time);
    const isLocationValid = fields.location && fields.location.trim() !== '';

    const isComplete = isDateValid && isTimeValid && isLocationValid;
    onComplete(fields, isComplete);
  }, [fields.date, fields.time, fields.location, onComplete]);

  const handleMarkerDragEnd = useCallback(async (event) => {
    const newPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMapState(prev => ({
      ...prev,
      markerPosition: newPosition,
    }));

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPosition.lat},${newPosition.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK" && data.results && data.results.length > 0) {
      const streetName = data.results[0].formatted_address;
      setFields(prev => ({
        ...prev,
        location: streetName,
        latitude: newPosition.lat, 
        longitude: newPosition.lng  
      }));
    } else {
      console.error("Error fetching location data:", data.status);
    }
  }, []);

  const handleChange = (field, value) => {
    setFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMapStateChange = (field, value) => {
    setMapState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box className="info-box">
      <Typography variant="h6" fontWeight="bold" sx={{ color: 'black' }}>Date and Location</Typography>

      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Date"
          value={fields.date.toISOString().split('T')[0]}
          onClick={() => handleMapStateChange('openDateModal', true)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><CalendarToday /></InputAdornment>,
            readOnly: true,
            className: 'text-field-input',
            classes: {
              notchedOutline: 'text-field-outline',
              root: 'text-field-outline-focused',
            },
          }}
        />
        <Modal open={mapState.openDateModal} onClose={() => handleMapStateChange('openDateModal', false)}>
          <Box className="modal-box">
            <Typography variant="h6" sx={{ color: 'black' }}>Select Date</Typography>
            <Calendar
              onChange={(value) => { handleChange('date', value); handleMapStateChange('openDateModal', false); }}
              value={fields.date}
            />
          </Box>
        </Modal>

        <TextField
          label="Hour"
          value={fields.time}
          onClick={() => handleMapStateChange('openTimeModal', true)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccessTime /></InputAdornment>,
            readOnly: true,
            className: 'text-field-input',
            classes: {
              notchedOutline: 'text-field-outline',
              root: 'text-field-outline-focused',
            },
          }}
        />
        <Modal open={mapState.openTimeModal} onClose={() => handleMapStateChange('openTimeModal', false)}>
          <Box className="modal-box">
            <Typography variant="h6" sx={{ color: 'black' }}>Select Time</Typography>
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fields.time}
              onChange={(e) => { handleChange('time', e.target.value); handleMapStateChange('openTimeModal', false); }}
              inputProps={{ step: 300 }}
              className="text-field-input"
            />
          </Box>
        </Modal>
      </Box>

      <TextField
        label="Location"
        value={fields.location}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <InputAdornment position="start"><LocationOn /></InputAdornment>,
          readOnly: true,
          className: 'text-field-input',
          classes: {
            notchedOutline: 'text-field-outline',
            root: 'text-field-outline-focused',
          },
        }}
      />

      {isLoaded && (
        <GoogleMap
          center={mapState.mapCenter}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '300px', marginTop: '16px' }}
          onClick={(e) => handleMapStateChange('markerPosition', { lat: e.latLng.lat(), lng: e.latLng.lng() })}
        >
          <Marker
            position={mapState.markerPosition}
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        </GoogleMap>
      )}
    </Box>
  );
};

export default DateLocation;