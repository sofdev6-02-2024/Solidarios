import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import StatusDropdown from './ActivityStatusDropdown';


interface ActivityCardProps {
  title: string;
  description: string;
  status: string;
  startTime: string;
  endTime: string;
  onStatusChange: (newStatus: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  status,
  startTime,
  endTime,
  onStatusChange,
}) => {
  return (
    <Card sx={{ mb: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" color="primary">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {description}
            </Typography>
            <Typography variant="body2">
              Start: <strong>{startTime}</strong>
            </Typography>
            <Typography variant="body2">
              End: <strong>{endTime}</strong>
            </Typography>
          </Box>
          <StatusDropdown currentStatus={status} onChange={onStatusChange} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
