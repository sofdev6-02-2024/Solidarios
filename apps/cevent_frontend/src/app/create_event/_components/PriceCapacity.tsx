import React from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material'; 
import { AttachMoney } from '@mui/icons-material';

const PriceCapacity = () => {
  return (
    <Box mb={4} p={3} border="1px solid #d0d0d0" borderRadius="8px">
      <Typography variant="h6" fontWeight="bold">Price and capacity</Typography>
      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Capacity"
          fullWidth
          margin="normal"
          InputProps={{ style: { color: 'black' } }}
        />
        <TextField
          label="Ticket price"
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            ),
            style: { color: 'black' },
          }}
        />
      </Box>
    </Box>
  );
};

export default PriceCapacity;