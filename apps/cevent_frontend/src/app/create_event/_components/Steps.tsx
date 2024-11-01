import React from 'react';
import { Box, Typography, FormControlLabel, Checkbox, IconButton, TextField, Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

const Steps = () => {
  return (
    <Box mb={4} p={3} className="info-box">
      <Box mb={4} p={3} border="2px solid #4a88e9" borderRadius="8px" marginBottom={2}>
        <Typography variant="h6" fontWeight="bold">Steps</Typography>

        <FormControlLabel control={<Checkbox />} label="General information" />
        <FormControlLabel control={<Checkbox />} label="Date and location" />
        <FormControlLabel control={<Checkbox />} label="Price and capacity" />

      </Box>
      <Box mb={4} p={2} border="2px solid #d0d0d0" borderRadius="8px">
        <Box mt={4} p={2} className="info-box">
          <Typography variant="h6" fontWeight="bold">Add Collaborators</Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <IconButton color="primary">
              <AddCircleOutline fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Box mt={4} p={2} className="info-box">
          <Typography variant="h6" fontWeight="bold">Set Reminder</Typography>
          <TextField
            label="Filter options"
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
            Create Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Steps;
