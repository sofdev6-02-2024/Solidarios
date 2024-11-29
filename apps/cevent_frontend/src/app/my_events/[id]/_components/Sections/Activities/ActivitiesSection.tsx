import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
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

const getStatusString = (status: number): string => {
  switch (status) {
    case 1: return 'Pending';
    case 2: return 'Cancelled';
    case 3: return 'Postponed';
    case 4: return 'In Progress';
    case 5: return 'Completed';
    case 6: return 'On Hold';
    default: return 'Unknown';
  }
};

interface ActivitiesSectionProps {
  id: string;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ id }) => {
  const [activitiesByStatus, setActivitiesByStatus] = useState<Record<number, EventActivity[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
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
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [id]);

  const renderActivities = (status: number) => {
    const activities = activitiesByStatus[status];
    if (!activities || activities.length === 0) {
      return <Typography 
      sx={{
        color: 'rgba(0, 0, 0, 0.5)',}}
      >No activities found for this status.</Typography>;
    }
    return activities.map((activity) => (
      <ActivityCard
        key={activity.id}
        title={activity.name}
        description={activity.description}
        status={getStatusString(activity.status)}
        startTime={new Date(activity.startTime).toLocaleString()}
        endTime={new Date(activity.endTime).toLocaleString()}
        onStatusChange={(newStatus: string) => console.log(`Status Changed to ${newStatus}`)}
      />
    ));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px" width="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px',
        mt: 8,
        mb: 8,
        backgroundColor: '#fafafa',
        borderRadius: 2,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box mb={4} textAlign="left">
        <Typography color="primary" variant="display">
          Activities{' '}
        </Typography>
        <Typography variant="display">Section</Typography>
      </Box>

      {Object.entries(EventStatus).map(([key, status]) => (
        <Box key={status} mt={4}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                textAlign: 'left',              
                mr: 2,
              }}
            >
              {getStatusString(status as number)} Activities
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                height: '2px',
                backgroundColor: '#ddd',
              }}
            />
          </Box>

          <Box>{renderActivities(status as number)}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default ActivitiesSection;
