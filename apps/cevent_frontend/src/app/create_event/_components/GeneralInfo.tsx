import React, { useEffect } from 'react';
import { TextField, FormHelperText, Typography, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import '../_styles/GeneralInfo.css';

const GeneralInfo = ({ onComplete }) => {
  const [title, setTitle] = React.useState('');
  const [shortDescription, setShortDescription] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('');

  useEffect(() => {    
    if (title && shortDescription && description && category) {
      onComplete(true);
    } else {
      onComplete(false);
    }
  }, [title, shortDescription, description, category, onComplete]);

  return (
    <Box className="info-box">
      <Typography variant="h6" fontWeight="bold">General event information</Typography>

      <FormHelperText className="form-helper-text">
        Be clear and descriptive with a title that explains what your event is about.
      </FormHelperText>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        InputProps={{
          className: 'text-field-outline'
        }}        
      />
      
      <FormHelperText className="form-helper-text">
        Set a short description for your event to give a brief summary of the event.
      </FormHelperText>

      <TextField
        label="Short Description"
        fullWidth
        margin="normal"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        InputProps={{
          className: 'text-field-outline'
        }}
      />
      
      <FormHelperText className="form-helper-text">
        Grab people's attention with a brief description of your event. Attendees will see it at the top of your event page.
      </FormHelperText>

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        InputProps={{
          className: 'text-field-outline'
        }}
      />
      
      <TextField
        label="Category"
        fullWidth
        margin="normal"
        select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        InputProps={{
          className: 'text-field-outline'
        }}
      >
        <MenuItem value="Conference">Conference</MenuItem>
        <MenuItem value="Workshop">Workshop</MenuItem>
        <MenuItem value="Networking">Networking</MenuItem>
      </TextField>
      
      <FormHelperText className="form-helper-text">
        Correctly categorize the type of event you are organizing.
      </FormHelperText>
    </Box>
  );
};

export default GeneralInfo;