import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import {
  FieldsPriceCapacity,
  PriceCapacityProps,
} from '@/utils/interfaces/CreateEvent';
import '../_styles/PriceCapacity.css';

const PriceCapacity: React.FC<PriceCapacityProps> = ({ onComplete }) => {
  const [fields, setFields] = useState<FieldsPriceCapacity>({
    capacity: 0,
    ticketPrice: 0,
  });

  useEffect(() => {
    const { capacity, ticketPrice } = fields;
    const isComplete = !!(capacity && ticketPrice);
    onComplete(fields, isComplete);
  }, [fields, onComplete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: parseFloat(value),
    }));
  };

  return (
    <Box className="info-box">
      <Typography variant="h6" fontWeight="bold">
        Price and Capacity
      </Typography>
      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Capacity"
          type="number"
          fullWidth
          margin="normal"
          name="capacity"
          value={fields.capacity}
          onChange={handleChange}
          InputProps={{
            className: 'input-field',
          }}
          inputProps={{
            'aria-label': 'Capacity',
            'aria-required': 'true',
          }}
        />
        <TextField
          label="Ticket Price"
          type="number"
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
          inputProps={{
            'aria-label': 'Ticket Price',
            'aria-required': 'true',
          }}
        />
      </Box>
    </Box>
  );
};

export default PriceCapacity;
