import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ActivityCard } from './ActivityCard';
import { getEventActivities } from '@/services/EventService';
import { EventActivity } from '@/utils/interfaces/EventActivities';

const EventStatus = {
  Pending: 1,
  Cancelled: 2,
  Postponed: 3,
  InProgress: 4,
  Completed: 5,
  OnHold: 6,
};

const getStatusString = (status: string): string => {
  switch (status) {
    case "1":
      return 'Pending';
    case "2":
      return 'Cancelled';
    case "3":
      return 'Postponed';
    case "4":
      return 'InProgress';
    case "5":
      return 'Completed';
    case "6":
      return 'OnHold';
    default:
      return 'Unknown';
  }
};


interface ActivitiesSectionProps {
  id: string;
}

const ActivitiesSection = ({ id }: ActivitiesSectionProps) => {
  const [activitiesByStatus, setActivitiesByStatus] = useState<Record<number, EventActivity[]>>({});

  useEffect(() => {
    const fetchActivities = async () => {
      const statuses = Object.values(EventStatus);
    
      const results = await Promise.all(
        statuses.map(async (status) => {
          const activities = await getEventActivities(id, status.toString());
          return { status, activities };
        })
      );
    
      const groupedActivities = results.reduce((acc, { status, activities }) => {
        
        acc[status] = activities || [];
        return acc;
      }, {} as Record<number, EventActivity[]>);
    
      setActivitiesByStatus(groupedActivities);
    };
    

    fetchActivities();
  }, [id]);

  const renderActivities = (status: number) => {
    return (
      activitiesByStatus[status]?.map((activity, index) => (
        <ActivityCard
          key={index}
          title={activity.name}
          description={activity.description}
          status={getStatusString(activity.status)}
          lastStatusUpdate={""}
        />
      )) || <Typography>No activities found for this status.</Typography>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box mb={4}>
        <Typography color="primary" variant="h4">
          Activities Section
        </Typography>
      </Box>

      {/* Completed Activities */}
      <Box>
        <Typography variant="h5" mb={2}>
          Completed Activities
        </Typography>
        {renderActivities(EventStatus.Completed)}
      </Box>

      {/* Activities in Progress */}
      <Box mt={4}>
        <Typography variant="h5" mb={2}>
          Activities in Progress
        </Typography>
        {renderActivities(EventStatus.InProgress)}
      </Box>

      {/* Delayed Activities */}
      <Box mt={4}>
        <Typography variant="h5" mb={2}>
          Delayed Activities
        </Typography>
        {renderActivities(EventStatus.Postponed)}
      </Box>

      {/* Pending Activities */}
      <Box mt={4}>
        <Typography variant="h5" mb={2}>
          Pending Activities
        </Typography>
        {renderActivities(EventStatus.Pending)}
      </Box>
    </Box>
  );
};

export default ActivitiesSection;
