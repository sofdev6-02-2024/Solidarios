import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material'; 
import { AttachMoney } from '@mui/icons-material';
import '../_styles/PriceCapacity.css';

const PriceCapacity = ({ onComplete }) => {
  const [fields, setFields] = useState({
    capacity: '',
    ticketPrice: ''
  });

  useEffect(() => {
    const { capacity, ticketPrice } = fields;
    const isComplete = capacity && ticketPrice;
    onComplete(fields, isComplete);
  }, [fields, onComplete]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  return (
    <Box className="info-box"> 
      <Typography variant="h6" fontWeight="bold">Price and capacity</Typography>
      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Capacity"
          fullWidth
          margin="normal"
          name="capacity"
          value={fields.capacity}
          onChange={handleChange}
          InputProps={{
            className: 'input-field', 
          }}
        />
        <TextField
          label="Ticket price"
          fullWidth
          margin="normal"
          name="ticketPrice"
          value={fields.ticketPrice}
          onChange={handleChange}
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