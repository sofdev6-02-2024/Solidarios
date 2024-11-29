import React from 'react';
import { Box, Typography, Chip } from '@mui/material';


interface ActivityCardProps {
    title: string;
    description: string;
    status: string;
    lastStatusUpdate: string;
  }
  
export const ActivityCard: React.FC<ActivityCardProps> = ({
    title,
    description,
    status,
    lastStatusUpdate,
  }) => {
    return (
      <Box
        sx={{
          borderBottom: '1px solid #e0e0e0',
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last Status Update: {lastStatusUpdate}
          </Typography>
        </Box>
        <Chip
          label={status}
          color={status === 'Ongoing' ? 'warning' : 'primary'}
          variant="outlined"
        />
      </Box>
    );
  };