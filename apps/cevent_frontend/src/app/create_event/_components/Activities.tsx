import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Dialog } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Close from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Activity } from '@/utils/interfaces/EventInterfaces';
import '../_styles/Activities.css';

const Activities: React.FC<{ onAddActivity: (activity: Activity) => void }> = ({ onAddActivity }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityTitle, setActivityTitle] = useState<string>('');
  const [activityDescription, setActivityDescription] = useState<string>('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [capacity, setCapacity] = useState<number | string>('');
  const [showActivityInputs, setShowActivityInputs] = useState<boolean>(false);

  const [openStartTimeModal, setOpenStartTimeModal] = useState(false);
  const [openEndTimeModal, setOpenEndTimeModal] = useState(false);

  const addActivity = () => {
    if (activityTitle && startTime && endTime) {
      const newActivity: Activity = {
        name: activityTitle,
        description: activityDescription,
        startTime,
        endTime,
        capacity: parseInt(capacity as string) || 0,
      };
      setActivities((prevActivities) => [...prevActivities, newActivity]);
      setActivityTitle('');
      setActivityDescription('');
      setStartTime(null);
      setEndTime(null);
      setCapacity('');
      setShowActivityInputs(false);

      onAddActivity(newActivity);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="info-box">
        <Typography variant="h6" className="activity-title">
          Activities
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Keep your event schedule organized by adding activities and notifying users when they are about to start.
        </Typography>

        <Button
          startIcon={showActivityInputs ? <Remove /> : <Add />}
          onClick={() => setShowActivityInputs(!showActivityInputs)}
          className="add-activity-button"
          variant="outlined"
        >
          {showActivityInputs ? 'Cancel Add Activity' : 'Add Activity'}
        </Button>

        {showActivityInputs && (
          <Box className="activity-input">
            <TextField
              label="Title"
              fullWidth
              value={activityTitle}
              onChange={(e) => setActivityTitle(e.target.value)}
              margin="normal"
              InputProps={{
                style: { color: 'black' },
              }}
            />
            <TextField
              label="Add Description"
              fullWidth
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              margin="normal"
              InputProps={{
                style: { color: 'black' },
              }}
            />
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Start Time"
                fullWidth
                onClick={() => setOpenStartTimeModal(true)}
                value={startTime ? startTime.toLocaleString() : ''}
                InputProps={{
                  readOnly: true,
                  style: { color: 'black' },
                }}
                margin="normal"
              />
              <TextField
                label="End Time"
                fullWidth
                onClick={() => setOpenEndTimeModal(true)}
                value={endTime ? endTime.toLocaleString() : ''}
                InputProps={{
                  readOnly: true,
                  style: { color: 'black' },
                }}
                margin="normal"
              />
              <TextField
                label="Capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                margin="normal"
                InputProps={{
                  style: { color: 'black' },
                }}
                fullWidth
              />
            </Box>

            <Button
              onClick={addActivity}
              variant="contained"
              className="add-activity-action"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Add Activity
            </Button>
          </Box>
        )}

        {activities.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1" className="added-activities-title">
              Added Activities:
            </Typography>
            {activities.map((activity, index) => (
              <Box key={index} mt={1}>
                <Typography variant="body1">Title: {activity.name}</Typography>
                <Typography variant="body2">Description: {activity.description}</Typography>
                <Typography variant="body2">Start Time: {activity.startTime?.toISOString()}</Typography>
                <Typography variant="body2">End Time: {activity.endTime?.toISOString()}</Typography>
                <Typography variant="body2">Capacity: {activity.capacity}</Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Start Time Modal */}
        <Dialog open={openStartTimeModal} onClose={() => setOpenStartTimeModal(false)}>
          <Box p={3}>
            <Typography variant="h6">Select Start Time</Typography>
            <DateTimePicker
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
                setOpenStartTimeModal(false);
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <Button
              startIcon={<Close />}
              onClick={() => setOpenStartTimeModal(false)}
              fullWidth
              sx={{ marginTop: 2 }}
              variant="outlined"
            >
              Close
            </Button>
          </Box>
        </Dialog>

        {/* End Time Modal */}
        <Dialog open={openEndTimeModal} onClose={() => setOpenEndTimeModal(false)}>
          <Box p={3}>
            <Typography variant="h6">Select End Time</Typography>
            <DateTimePicker
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
                setOpenEndTimeModal(false);
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <Button
              startIcon={<Close />}
              onClick={() => setOpenEndTimeModal(false)}
              fullWidth
              sx={{ marginTop: 2 }}
              variant="outlined"
            >
              Close
            </Button>
          </Box>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Activities;