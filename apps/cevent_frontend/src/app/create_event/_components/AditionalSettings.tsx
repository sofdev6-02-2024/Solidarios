import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';

const AditionalSettings = () => {
  const [attendanceControl, setAttendanceControl] = useState(false);

  const handleToggle = (event) => {
    setAttendanceControl(event.target.checked);
  };

  return (
    <Box border="1px solid #4a88e9" borderRadius="8px" padding="16px" marginTop="16px">
      <Typography variant="h6" fontWeight="bold">Additional Settings</Typography>
      
      <Typography variant="body1" fontWeight="bold" marginTop="16px">
        Enable attendance control for the event
      </Typography>
      <Typography variant="body2" marginBottom="16px">
        If you enable attendance control you will be able to register who entered and were present at your event.
      </Typography>
      
      <FormControlLabel
        control={
          <Switch
            checked={attendanceControl}
            onChange={handleToggle}
            color="primary" 
            inputProps={{ 'aria-label': 'Attendance Control Toggle' }}
          />
        }
        label=""
        labelPlacement="start"
        style={{ marginLeft: 'auto' }} 
      />
    </Box>
  );
};

export default AditionalSettings;
