import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { Add } from '@mui/icons-material';
import '../_styles/Activities.css';

const Activities = ({ onAddActivity }) => { 
  const [activities, setActivities] = useState([]);  
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [eventId, setEventId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState('');
  const [capacity, setCapacity] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [showActivityInputs, setShowActivityInputs] = useState(false);

  const addActivity = () => {
    if (activityTitle && eventId && startTime && endTime && status) {
      const newActivity = {
        eventId,
        name: activityTitle,
        description: activityDescription,
        startTime,
        endTime,
        status,
        capacity: parseInt(capacity) || 0,
        createdAt,
      };
      setActivities((prevActivities) => [...prevActivities, newActivity]);
      setActivityTitle('');
      setActivityDescription('');
      setEventId('');
      setStartTime('');
      setEndTime('');
      setStatus('');
      setCapacity('');
      setShowActivityInputs(false);
      
      
      onAddActivity(newActivity);
    }
  };

  return (
    <Box className="info-box">
      <Typography variant="h6" className="activity-title">Activities</Typography>
      <Box display="flex" alignItems="center" mt={2}>
        <Typography>Keep your event schedule organized by adding activities and notifying users when they are about to start.</Typography>
        <Button
          startIcon={<Add />}
          onClick={() => setShowActivityInputs(!showActivityInputs)}
          className="add-activity-button"
          variant="outlined"
        >
          {showActivityInputs ? 'No Add Activity' : 'Add Activity'}
        </Button>
      </Box>

      {showActivityInputs && (
        <Box className="activity-input">
          <TextField
            label="Event ID"
            fullWidth
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            margin="normal"
            InputProps={{
              className: 'input-text',
            }}
          />
          <TextField
            label="Activity Title"
            fullWidth
            value={activityTitle}
            onChange={(e) => setActivityTitle(e.target.value)}
            margin="normal"
            InputProps={{
              className: 'input-text',
            }}
          />
          <TextField
            label="Description"
            fullWidth
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
            margin="normal"
            InputProps={{
              className: 'input-text',
            }}
          />
          <TextField
            label="Start Time"
            type="datetime-local"
            fullWidth
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            margin="normal"
            sx={{
              color: 'white',
              '& .MuiInputBase-input': {
                color: 'white',
                '&:focus': {
                  color: 'black',
                },
              },
              '& .MuiSvgIcon-root': {
                color: '#4a88e9',
              },
            }}
          />
          <TextField
            label="End Time"
            type="datetime-local"
            fullWidth
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            margin="normal"
            sx={{
              color: 'white',
              '& .MuiInputBase-input': {
                color: 'white',
                '&:focus': {
                  color: 'black',
                },
              },
              '& .MuiSvgIcon-root': {
                color: '#4a88e9',
              },
            }}
          />
          <TextField
            label="Status"
            select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
            InputProps={{
              className: 'input-text',
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root': {
                    color: 'black',
                  },
                },
              },
            }}
          >
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
          <TextField
            label="Capacity"
            type="number"
            fullWidth
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            margin="normal"
            InputProps={{
              className: 'input-text',
            }}
          />
          <Button
            onClick={addActivity}
            variant="contained"
            className="add-activity-action"
          >
            Add Activity
          </Button>
        </Box>
      )}

      {activities.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1" className="added-activities-title">Added Activities:</Typography>
          {activities.map((activity, index) => (
            <Box key={index} mt={1}>
              <Typography variant="body1">Event ID: {activity.eventId}</Typography>
              <Typography variant="body1">Title: {activity.name}</Typography>
              <Typography variant="body2">Description: {activity.description}</Typography>
              <Typography variant="body2">Start Time: {activity.startTime}</Typography>
              <Typography variant="body2">End Time: {activity.endTime}</Typography>
              <Typography variant="body2">Status: {activity.status}</Typography>
              <Typography variant="body2">Capacity: {activity.capacity}</Typography>
              <Typography variant="body2">Created At: {activity.createdAt}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Activities;