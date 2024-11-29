import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { ActivityCard } from './ActivityCard';
import {
  getEventActivities,
  updateEventActivity,
} from '@/services/EventService';
import {
  EventActivity,
  EventActivityDto,
} from '@/utils/interfaces/EventActivities';
import ConfirmDialog from './EditStatusDialog';

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
    case 1:
      return 'Pending';
    case 2:
      return 'Cancelled';
    case 3:
      return 'Postponed';
    case 4:
      return 'In Progress';
    case 5:
      return 'Completed';
    case 6:
      return 'On Hold';
    default:
      return 'Unknown';
  }
};

const getStatusNumber = (status: string): number => {
  switch (status) {
    case 'Pending':
      return 1;
    case 'Cancelled':
      return 2;
    case 'Postponed':
      return 3;
    case 'In Progress':
      return 4;
    case 'Completed':
      return 5;
    case 'On Hold':
      return 6;
    default:
      return 0;
  }
};

interface ActivitiesSectionProps {
  id: string;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ id }) => {
  const [activitiesByStatus, setActivitiesByStatus] = useState<
    Record<number, EventActivity[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] =
    useState<EventActivity | null>(null);
  const [newStatus, setNewStatus] = useState<number>(0);
  const [lastStatusChangeMap, setLastStatusChangeMap] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const statuses = Object.values(EventStatus);

        const results = await Promise.all(
          statuses.map(async (status) => {
            const activities = await getEventActivities(id, status.toString());
            return { status, activities };
          }),
        );

        const groupedActivities = results.reduce(
          (acc, { status, activities }) => {
            acc[status] = activities || [];
            return acc;
          },
          {} as Record<number, EventActivity[]>,
        );

        setActivitiesByStatus(groupedActivities);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [id]);

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  };

  const handleStatusChange = (activity: EventActivity, status: number) => {
    setLastStatusChangeMap((prevMap) => ({
      ...prevMap,
      [activity.id]: getCurrentTime(),
    }));
    setSelectedActivity(activity);
    setNewStatus(status);
    setOpenDialog(true);
  };

  const handleStatusChangeIfPressedYes = async () => {
    if (!selectedActivity) return;

    const updatedActivity: EventActivityDto = {
      name: selectedActivity.name,
      description: selectedActivity.description,
      startTime: selectedActivity.startTime,
      endTime: selectedActivity.endTime,
      status: newStatus,
      capacity: selectedActivity.capacity,
    };

    try {
      const updated = await updateEventActivity(
        id,
        selectedActivity.id.toString(),
        updatedActivity,
      );
      if (updated) {
        console.log(
          `Activity status updated to: ${getStatusString(newStatus)}`,
        );
        setActivitiesByStatus((prev) => {
          const updatedStatusActivities = prev[selectedActivity.status].filter(
            (a) => a.id !== selectedActivity.id,
          );
          const newStatusActivities = [...(prev[newStatus] || []), updated];
          return {
            ...prev,
            [selectedActivity.status]: updatedStatusActivities,
            [newStatus]: newStatusActivities,
          };
        });
      }
    } catch (error) {
      console.error('Failed to update activity status:', error);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const renderActivities = (status: number) => {
    const activities = activitiesByStatus[status];
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
        lastStatusChange={lastStatusChangeMap[activity.id] || ''}
      />
    ));
  };

  if (loading) {
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

      <ConfirmDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleStatusChangeIfPressedYes}
      />
    </Box>
  );
};

export default ActivitiesSection;
