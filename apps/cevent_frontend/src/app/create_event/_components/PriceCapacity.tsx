import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import {
  FieldsPriceCapacity,
  PriceCapacityProps,
} from '@/utils/interfaces/CreateEvent';
import '../_styles/PriceCapacity.css';
import { validateCapacity, validateTicketPrice } from '@/utils/Validations';

const PriceCapacity: React.FC<PriceCapacityProps> = ({ onComplete }) => {
  const [fields, setFields] = useState<FieldsPriceCapacity>({
    capacity: 0,
    ticketPrice: 0,
  });

  const [errors, setErrors] = useState<Partial<FieldsPriceCapacity>>({
    capacity: '',
    ticketPrice: '',
  });

  useEffect(() => {
    const { capacity, ticketPrice } = fields;
    const isComplete = !errors.capacity && !errors.ticketPrice && capacity && ticketPrice;
    onComplete(fields, isComplete);
  }, [fields, errors, onComplete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);
    setFields((prevFields) => ({
      ...prevFields,
      [name]: parsedValue,
    }));
    
    if (name === 'capacity') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        capacity: validateCapacity(parsedValue),
      }));
    } else if (name === 'ticketPrice') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ticketPrice: validateTicketPrice(parsedValue),
      }));
    }
  };

  return (
    <Box className="info-box">
      <Typography variant="h6" fontWeight="bold">
        Price and Capacity
      </Typography>
      <Box display="flex" gap={2} mt={2}>
        <Box flex={1}>
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
            error={!!errors.capacity}
          />
          {errors.capacity && (
            <Typography
              variant="body2"
              color="error"
              style={{ fontSize: '8px', marginTop: '4px' }}
            >
              {errors.capacity}
            </Typography>
          )}
        </Box>
        <Box flex={1}>
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
            error={!!errors.ticketPrice}
          />
          {errors.ticketPrice && (
            <Typography
              variant="body2"
              color="error"
              style={{ fontSize: '8px', marginTop: '4px' }}
            >
              {errors.ticketPrice}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PriceCapacity;