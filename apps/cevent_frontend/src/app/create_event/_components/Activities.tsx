import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [showActivityInputs, setShowActivityInputs] = useState(false);

  const addActivity = () => {
    if (activityTitle) {
      setActivities((prevActivities) => [
        ...prevActivities,
        { title: activityTitle, description: activityDescription },
      ]);
      setActivityTitle('');
      setActivityDescription('');
      setShowActivityInputs(false);
    }
  };

  return (
    <Box mb={4} p={3} border="1px solid #4a88e9" borderRadius="8px" className="info-box">
      <Typography variant="h6" fontWeight="bold">Activities</Typography>
      <Box display="flex" alignItems="center" mt={2}>
        <Typography>Keep your event schedule organized by adding activities and notifying users when they are about to start.</Typography>
        <Button
          startIcon={<Add />}
          onClick={() => setShowActivityInputs(!showActivityInputs)}
          sx={{ ml: 2 }}
          variant="outlined"
        >
          {showActivityInputs ? 'No Add Activity' : 'Add Activity'}
        </Button>
      </Box>
      {showActivityInputs && (
        <Box mt={2}>
          <TextField
            label="Activity Title"
            fullWidth
            value={activityTitle}
            onChange={(e) => setActivityTitle(e.target.value)}
            InputProps={{
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
          <Button
            onClick={() => setActivityDescription(activityDescription ? '' : 'Show')}
            variant="outlined"
            sx={{ mr: 2, mt: 2 }} 
          >
            {activityDescription ? 'Remove Description' : 'Add Description'}
          </Button>
          {activityDescription && (
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              InputProps={{
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
          )}
          <Button
            onClick={addActivity}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Add Activity
          </Button>
        </Box>
      )}
      {activities.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1" fontWeight="bold">Added Activities:</Typography>
          {activities.map((activity, index) => (
            <Box key={index} mt={1}>
              <Typography variant="body1">{activity.title}</Typography>
              {activity.description && <Typography variant="body2">{activity.description}</Typography>}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Activities;
