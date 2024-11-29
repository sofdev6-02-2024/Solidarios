// src/components/ActivitiesSection/index.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress 
} from '@mui/material';

import { 
  getEventActivities, 
  updateEventActivity 
} from '@/services/EventService';

import { 
  EventStatus, 
  getStatusString, 
  getStatusNumber,
  getCurrentTime 
} from '@/utils/methods/eventStatusUtils';
import { 
  EventActivity, 
  EventActivityDto,
  ActivitiesSectionProps,
  ActivitiesState,
  DialogState 
} from '@/utils/interfaces/EventActivities';

import { ActivityCard } from './ActivityCard';
import ConfirmDialog from './EditStatusDialog';
import { StatusSectionHeader } from './StatusSectionHeader';

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ id }) => {
  const [state, setState] = useState<ActivitiesState>({
    activitiesByStatus: {},
    loading: true,
    lastStatusChangeMap: {},
  });

  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    selectedActivity: null,
    newStatus: 0,
  });

  const fetchActivities = useCallback(async () => {
    try {
      const statuses = Object.values(EventStatus);
      const results = await Promise.all(
        statuses.map(status => 
          getEventActivities(id, status.toString())
            .then(activities => ({ status, activities }))
        )
      );

      setState(prev => ({
        ...prev,
        activitiesByStatus: results.reduce((acc, { status, activities }) => {
          acc[status] = activities || [];
          return acc;
        }, {} as Record<number, EventActivity[]>),
        loading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [id]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleStatusChange = useCallback((activity: EventActivity, status: number) => {
    const currentTime = getCurrentTime();
    
    setState(prev => ({
      ...prev,
      lastStatusChangeMap: {
        ...prev.lastStatusChangeMap,
        [activity.id]: currentTime,
      },
    }));

    setDialogState({
      open: true,
      selectedActivity: activity,
      newStatus: status,
    });
  }, []);

  const handleStatusChangeConfirm = useCallback(async () => {
    const { selectedActivity, newStatus } = dialogState;
    if (!selectedActivity) return;

    try {
      const updatedActivity: EventActivityDto = {
        ...selectedActivity,
        status: newStatus,
      };

      const updated = await updateEventActivity(
        id, 
        selectedActivity.id.toString(), 
        updatedActivity
      );

      if (updated) {
        setState(prev => {
          const newActivitiesByStatus = { ...prev.activitiesByStatus };
          
          newActivitiesByStatus[selectedActivity.status] = 
            newActivitiesByStatus[selectedActivity.status].filter(
              a => a.id !== selectedActivity.id
            );
          
          newActivitiesByStatus[newStatus] = [
            ...(newActivitiesByStatus[newStatus] || []),
            updated
          ];

          return { ...prev, activitiesByStatus: newActivitiesByStatus };
        });
      }
    } catch (error) {
      console.error('Failed to update activity status:', error);
    } finally {
      setDialogState(prev => ({ ...prev, open: false }));
    }
  }, [id, dialogState]);

  const renderActivities = (status: number) => {
    const activities = state.activitiesByStatus[status];
    if (!activities || activities.length === 0) {
      return (
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          No activities found for this status.
        </Typography>
      );
    }
    return activities.map((activity) => (
      <ActivityCard
        key={activity.id}
        title={activity.name}
        description={activity.description}
        status={getStatusString(activity.status)}
        startTime={new Date(activity.startTime).toLocaleString()}
        endTime={new Date(activity.endTime).toLocaleString()}
        onStatusChange={(status) =>
          handleStatusChange(activity, getStatusNumber(status))
        }
        lastStatusChange={state.lastStatusChangeMap[activity.id] || ''}
      />
    ));
  };

  const renderActivitiesSection = () => {
    return Object.entries(EventStatus).map(([key, status]) => (
      <Box key={status} mt={4}>
        <StatusSectionHeader status={status as number} />
        <Box>{renderActivities(status as number)}</Box>
      </Box>
    ));
  };

  if (state.loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
        width="100%"
      >
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

      {renderActivitiesSection()}

      <ConfirmDialog
        open={dialogState.open}
        onClose={() => setDialogState(prev => ({ ...prev, open: false }))}
        onConfirm={handleStatusChangeConfirm}
      />
    </Box>
  );
};

export default ActivitiesSection;