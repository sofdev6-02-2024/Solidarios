import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material'; 
import { AttachMoney } from '@mui/icons-material';
import '../_styles/PriceCapacity.css';

const PriceCapacity = ({ onComplete }) => { 
  const [capacity, setCapacity] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  useEffect(() => {   
    if (capacity && ticketPrice) {
      onComplete(true); 
    } else {
      onComplete(false); 
    }
  }, [capacity, ticketPrice, onComplete]);

  return (
    <Box className="info-box"> 
      <Typography variant="h6" fontWeight="bold">Price and capacity</Typography>
      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Capacity"
          fullWidth
          margin="normal"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          InputProps={{
            className: 'input-field', 
          }}
        />
        <TextField
          label="Ticket price"
          fullWidth
          margin="normal"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            ),
            className: 'input-field', 
          }}
        />
      </Box>
    </Box>
  );
};

export default PriceCapacity;