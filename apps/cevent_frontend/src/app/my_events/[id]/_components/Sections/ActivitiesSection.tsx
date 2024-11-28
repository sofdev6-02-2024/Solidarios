import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { activities, ActivityCard } from './ActivityCard';

const ActivitiesSection = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box mb={4}>
        <Typography color="primary" variant="h4">
          Activity Management
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" mb={2}>
          Completed activities
        </Typography>
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            title={activity.title}
            description={activity.description}
            status={activity.status}
            lastStatusUpdate={activity.lastStatusUpdate}
          />
        ))}
      </Box>
      <Box mt={4}>
        <Typography variant="h5" mb={2}>
          Activities in progress
        </Typography>
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            title={activity.title}
            description={activity.description}
            status={activity.status}
            lastStatusUpdate={activity.lastStatusUpdate}
          />
        ))}
      </Box>
      <Box mt={4}>
        <Typography variant="h5" mb={2}>
          Delayed activities
        </Typography>
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            title={activity.title}
            description={activity.description}
            status={activity.status}
            lastStatusUpdate={activity.lastStatusUpdate}
          />
        ))}
      </Box>
      <Box mt={4}>
        <Typography variant="h5" mb={2}>
          Pending activities
        </Typography>
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            title={activity.title}
            description={activity.description}
            status={activity.status}
            lastStatusUpdate={activity.lastStatusUpdate}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ActivitiesSection;