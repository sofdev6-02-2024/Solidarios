import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import { CalendarToday, AccessTime, LocationOn } from '@mui/icons-material';
import Calendar from 'react-calendar';
import Modal from '@mui/material/Modal';

const DateLocation = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);

  return (
    <Box mb={4} p={3} border="1px solid #4a88e9" borderRadius="8px" className="info-box">
      <Typography variant="h6" fontWeight="bold">Date and location</Typography>
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
            sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4a88e9',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4a88e9',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4a88e9',
              },
            },
          }}
        />
        <Modal open={openDateModal} onClose={() => setOpenDateModal(false)}>
          <Box className="modal-box">
            <Typography variant="h6">Select Date</Typography>
            <Calendar
              onChange={(value) => {
                setDate(value);
                setOpenDateModal(false);
              }}
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
            sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4a88e9',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4a88e9',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4a88e9',
              },
            },
          }}
        />
        <Modal open={openTimeModal} onClose={() => setOpenTimeModal(false)}>
          <Box className="modal-box">
            <Typography variant="h6">Select Time</Typography>
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                setOpenTimeModal(false);
              }}
              inputProps={{
                step: 300,
              }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a88e9',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a88e9',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a88e9',
                },
              }}
            />
          </Box>
        </Modal>
      </Box>
      
      <TextField
        label="Location"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <InputAdornment position="start"><LocationOn /></InputAdornment>,
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
          },
        }}
      />
    </Box>
  );
};

export default DateLocation;