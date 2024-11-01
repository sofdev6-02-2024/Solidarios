import React from 'react';
import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material';

const AdditionalSettings = () => {
  return (
    <Box mb={4} p={3} className="info-box">
      <Typography variant="h6" fontWeight="bold">Steps</Typography>
      <FormControlLabel control={<Checkbox />} label="Set event as featured" />
      <FormControlLabel control={<Checkbox />} label="Require registration" />
      <FormControlLabel control={<Checkbox />} label="Enable reminders for attendees" />
    </Box>
  );
};

export default AdditionalSettings;
