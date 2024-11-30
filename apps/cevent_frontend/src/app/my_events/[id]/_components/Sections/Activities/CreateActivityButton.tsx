import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateActivityDialog from './CreateActivityDialog';

interface CreateActivityButtonProps {
  onActivityCreated: (activity: any) => void;
}

const CreateActivityButton: React.FC<CreateActivityButtonProps> = ({ onActivityCreated }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpenDialog}
        sx={{ position: 'absolute', top: 0, right: 0 }}
      >
        Create Activity
      </Button>
      <CreateActivityDialog
        open={open}
        onClose={handleCloseDialog}
        onActivityCreated={onActivityCreated}
      />
    </>
  );
};

export default CreateActivityButton;
