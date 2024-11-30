import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface CreateActivityDialogProps {
  open: boolean;
  onClose: () => void;
  onActivityCreated: (activity: any) => void;
}

const CreateActivityDialog: React.FC<CreateActivityDialogProps> = ({
  open,
  onClose,
  onActivityCreated
}) => {
  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  
  const handleSubmit = () => {
    const newActivity = { name: activityName, description: activityDescription };
    onActivityCreated(newActivity);
    setActivityName('');
    setActivityDescription('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Activity</DialogTitle>
      <DialogContent>
        <TextField
          label="Activity Name"
          fullWidth
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={activityDescription}
          onChange={(e) => setActivityDescription(e.target.value)}
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
