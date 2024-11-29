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
  lastStatusChange: string | null;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  status,
  startTime,
  endTime,
  onStatusChange,
  lastStatusChange,
}) => {
  return (
    <Card
      sx={{ mb: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="secondary">
              {startTime.split(', ')[1]} - {endTime.split(', ')[1]}
            </Typography>
            <Typography variant="h6" color="primary">
              <strong>{title}</strong>
            </Typography>

            <Typography variant="body2" color="secondary" sx={{ mb: 1 }}>
              {description}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap="0.5rem"
          >
            <StatusDropdown currentStatus={status} onChange={onStatusChange} />
            <Typography variant="body2" color="secondary">
              Last Status Update
            </Typography>
            <Typography variant="body2" color="primary">
              <strong>
                {lastStatusChange
                  ? lastStatusChange
                  : 'Status not modified yet'}
              </strong>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
