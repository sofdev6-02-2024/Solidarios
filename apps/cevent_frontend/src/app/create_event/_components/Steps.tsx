import React from 'react';
import { Box, Typography, FormControlLabel, Checkbox, IconButton, TextField, Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import '../_styles/Steps.css';

const Steps = ({ isGeneralInfoComplete, isDateLocationComplete, isPriceCapacityComplete }) => {
  return (
    <Box mb={4} p={3}>
      <Box mb={4} p={3} className="step-container">
        <Typography variant="h6" className="checkbox-label">Steps</Typography>

        <FormControlLabel control={<Checkbox checked={isGeneralInfoComplete} />} label="General information" />
        <FormControlLabel control={<Checkbox checked={isDateLocationComplete} />} label="Date and location" />
        <FormControlLabel control={<Checkbox checked={isPriceCapacityComplete} />} label="Price and capacity" />
      </Box>

      <Box className="reminder-container">
        <Box mt={4} p={2}>
          <Typography variant="h6" className="checkbox-label">Add Collaborators</Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <IconButton color="primary">
              <AddCircleOutline fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Box mt={4} p={2}>
          <Typography variant="h6" className="checkbox-label">Set Reminder</Typography>
          <TextField
            label="Filter options"
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <Button variant="contained" color="primary" fullWidth className="create-event-button">
            Create Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Steps;
