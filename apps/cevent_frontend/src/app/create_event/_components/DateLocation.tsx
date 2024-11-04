import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, TextField, InputAdornment, Modal } from '@mui/material';
import { CalendarToday, AccessTime, LocationOn } from '@mui/icons-material';
import Calendar from 'react-calendar';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import '../_styles/DateLocation.css';

const DateLocation = ({ onComplete }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: -17.366198, lng: -66.175489 });
  const [markerPosition, setMarkerPosition] = useState(mapCenter);


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {    
    const isComplete = date && time && location;
    onComplete(isComplete);
  }, [date, time, location, onComplete]);

  const handleMarkerDragEnd = useCallback(async (event) => {
    const newPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkerPosition(newPosition);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPosition.lat},${newPosition.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK" && data.results && data.results.length > 0) {
      const streetName = data.results[0].formatted_address;
      setLocation(streetName);
    } else {
      console.error("Error fetching location data:", data.status);
    }
  }, []);

  return (
    <Box className="info-box">
      <Typography variant="h6" fontWeight="bold" sx={{ color: 'black' }}>Date and Location</Typography>
      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Date"
          value={date.toISOString().split('T')[0]}
          onClick={() => setOpenDateModal(true)}
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
        <Modal open={openDateModal} onClose={() => setOpenDateModal(false)}>
          <Box className="modal-box">
            <Typography variant="h6" sx={{ color: 'black' }}>Select Date</Typography>
            <Calendar
              onChange={(value) => { setDate(value); setOpenDateModal(false); }}
              value={date}
            />
          </Box>
        </Modal>

        <TextField
          label="Hour"
          value={time}
          onClick={() => setOpenTimeModal(true)}
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
        <Modal open={openTimeModal} onClose={() => setOpenTimeModal(false)}>
          <Box className="modal-box">
            <Typography variant="h6" sx={{ color: 'black' }}>Select Time</Typography>
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={time}
              onChange={(e) => { setTime(e.target.value); setOpenTimeModal(false); }}
              inputProps={{ step: 300 }}
              className="text-field-input"
            />
          </Box>
        </Modal>
      </Box>

      <TextField
        label="Location"
        value={location}
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
          center={mapCenter}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '300px', marginTop: '16px' }}
          onClick={(e) => setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
        >
          <Marker
            position={markerPosition}
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        </GoogleMap>
      )}
    </Box>
  );
};

export default DateLocation;