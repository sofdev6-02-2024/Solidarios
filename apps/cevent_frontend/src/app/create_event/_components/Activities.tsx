import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { Activity} from '@/utils/interfaces/CreateEvent';
import '../_styles/Activities.css';

interface ActivitiesProps{
  onComplete: (activities: Activity[]) => void;
}
const Activities: React.FC<ActivitiesProps> = ({ onComplete }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityTitle, setActivityTitle] = useState<string>('');
  const [activityDescription, setActivityDescription] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [capacity, setCapacity] = useState<number | string>('');
  const [showActivityInputs, setShowActivityInputs] = useState<boolean>(false);

  const addActivity = () => {
    if (activityTitle && startTime && endTime) {
      const newActivity: Activity = {
        name: activityTitle,
        description: activityDescription,
        startTime,
        endTime,
        capacity: parseInt(capacity as string) || 0,
        createdAt: new Date().toISOString(),
      };
      setActivities((prevActivities) => [...prevActivities, newActivity]);
      setActivityTitle('');
      setActivityDescription('');
      setStartTime('');
      setEndTime('');
      setCapacity('');
      setShowActivityInputs(false);
    }
  };

  useEffect(() => {
    onComplete(activities);
  }, [activities, onComplete]);

  return (
    <Box className="info-box">
      <Typography variant="h6" className="activity-title">
        Activities
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Keep your event schedule organized by adding activities and notifying
        users when they are about to start.
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
            sx={{ color: 'black' }}
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
            sx={{ color: 'black' }}
            InputProps={{
              style: { color: 'black' },
            }}
          />
          <Box display="flex" gap={2}>
            <TextField
              label="Capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              margin="normal"
              InputProps={{
                style: { color: 'black' },
              }}
              sx={{ flex: 1, color: 'black' }}
            />
            <TextField
              label="Start Time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <span role="img" aria-label="clock">
                    ⏰
                  </span>
                ),
                style: { color: 'black' },
              }}
              sx={{ flex: 1 }}
            />
            <TextField
              label="End Time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <span role="img" aria-label="clock">
                    ⏰
                  </span>
                ),
                style: { color: 'black' },
              }}
              sx={{ flex: 1 }}
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
              <Typography variant="body2">
                Description: {activity.description}
              </Typography>
              <Typography variant="body2">
                Start Time: {activity.startTime}
              </Typography>
              <Typography variant="body2">
                End Time: {activity.endTime}
              </Typography>
              <Typography variant="body2">
                Capacity: {activity.capacity}
              </Typography>
              <Typography variant="body2">
                Created At: {activity.createdAt}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Activities;
