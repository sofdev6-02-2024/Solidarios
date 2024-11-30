import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { EventActivityDto } from '@/utils/interfaces/EventActivities';
import { createEventActivity } from '@/services/EventService';

interface CreateActivityDialogProps {
  open: boolean;
  onClose: () => void;
  onActivityCreated: (activity: any) => void;
  eventId: string;
}

const CreateActivityDialog: React.FC<CreateActivityDialogProps> = ({
  open,
  onClose,
  onActivityCreated,
  eventId,
}) => {
  const [formData, setFormData] = useState<EventActivityDto>({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    status: 1,
    capacity: 0,
  });

  const handleChange = (field: keyof EventActivityDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const createdActivity = await createEventActivity(eventId, formData);
      if (createdActivity) {
        onActivityCreated(createdActivity);
        setFormData({
          name: '',
          description: '',
          startTime: '',
          endTime: '',
          status: 1,
          capacity: 0,
        });
        onClose();
      } else {
        console.error('Failed to create activity');
      }
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Activity</DialogTitle>
      <DialogContent>
        <TextField
          label="Activity Name"
          fullWidth
          value={formData.name}
          onChange={handleChange('name')}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={formData.description}
          onChange={handleChange('description')}
          margin="normal"
        />
        <TextField
          label="Start Time"
          type="datetime-local"
          fullWidth
          value={formData.startTime}
          onChange={handleChange('startTime')}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Time"
          type="datetime-local"
          fullWidth
          value={formData.endTime}
          onChange={handleChange('endTime')}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Status"
          select
          fullWidth
          value={formData.status}
          onChange={handleChange('status')}
          margin="normal"
        >
          <MenuItem value={1}>Pending</MenuItem>
          <MenuItem value={2}>Cancelled</MenuItem>
          <MenuItem value={3}>Postponed</MenuItem>
          <MenuItem value={4}>In Progress</MenuItem>
          <MenuItem value={5}>Completed</MenuItem>
          <MenuItem value={6}>On Hold</MenuItem>
        </TextField>
        <TextField
          label="Capacity"
          type="number"
          fullWidth
          value={formData.capacity}
          onChange={handleChange('capacity')}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateActivityDialog;
