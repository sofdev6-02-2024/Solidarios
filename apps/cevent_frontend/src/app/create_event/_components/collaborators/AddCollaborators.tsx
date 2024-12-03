// AddCollaborators.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { AddCircleOutline, Delete } from '@mui/icons-material';

const AddCollaborators = ({ onAddCollaborators }: { onAddCollaborators: (ids: string[]) => void }) => {
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [collaborators, setCollaborators] = useState<string[]>([]);

  const handleAdd = () => {
    if (collaboratorEmail && !collaborators.includes(collaboratorEmail)) {
      setCollaborators([...collaborators, collaboratorEmail]);
      setCollaboratorEmail('');
    }
  };

  const handleRemove = (email: string) => {
    setCollaborators(collaborators.filter((collaborator) => collaborator !== email));
  };

  const handleSubmit = () => {
    onAddCollaborators(collaborators);
  };

  return (
    <Box>
      <Typography variant="h6">Add Collaborators</Typography>
      <Box display="flex" gap={1} mt={2}>
        <TextField
          label="Collaborator Email"
          value={collaboratorEmail}
          onChange={(e) => setCollaboratorEmail(e.target.value)}
          fullWidth
        />
        <IconButton color="primary" onClick={handleAdd}>
          <AddCircleOutline />
        </IconButton>
      </Box>
      <List>
        {collaborators.map((email, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" onClick={() => handleRemove(email)}>
              <Delete />
            </IconButton>
          }>
            <ListItemText primary={email} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Confirm Collaborators
      </Button>
    </Box>
  );
};

export default AddCollaborators;
