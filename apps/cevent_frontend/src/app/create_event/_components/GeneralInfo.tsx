import React, { useEffect, useState } from 'react';
import { TextField, FormHelperText, Typography, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import '../_styles/GeneralInfo.css';

const GeneralInfo = ({ onComplete }) => {
  const [fields, setFields] = useState({
    title: '',
    shortDescription: '',
    description: '',
    category: ''
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const handleFieldChange = (field) => (e) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: e.target.value
    }));
  };

  const checkCompletion = () => {
    const { title, shortDescription, description, category } = fields;
    return title && shortDescription && description && category;
  };

  useEffect(() => {
    const isComplete = checkCompletion();

    if (isComplete !== isCompleted) {
      setIsCompleted(isComplete);
      onComplete(fields, isComplete);
    }
  }, [fields, onComplete, isCompleted]);

  return (
    <Box className="info-box">
      <Typography variant="h6" fontWeight="bold">
        General event information
      </Typography>

      <FormHelperText className="form-helper-text">
        Be clear and descriptive with a title that explains what your event is about.
      </FormHelperText>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={fields.title}
        onChange={handleFieldChange('title')}
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
        value={fields.shortDescription}
        onChange={handleFieldChange('shortDescription')}
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
        value={fields.description}
        onChange={handleFieldChange('description')}
        InputProps={{
          className: 'text-field-outline'
        }}
      />

      <FormHelperText className="form-helper-text">
        Correctly categorize the type of event you are organizing.
      </FormHelperText>

      <TextField
        label="Category"
        fullWidth
        margin="normal"
        select
        value={fields.category}
        onChange={handleFieldChange('category')}
        InputProps={{
          className: 'text-field-outline'
        }}
      >
        <MenuItem value="Conference" sx={{ color: 'black' }}>Conference</MenuItem>
        <MenuItem value="Workshop" sx={{ color: 'black' }}>Workshop</MenuItem>
        <MenuItem value="Networking" sx={{ color: 'black' }}>Networking</MenuItem>
        <MenuItem value="Music" sx={{ color: 'black' }}>Music</MenuItem>
        <MenuItem value="Sports" sx={{ color: 'black' }}>Sports</MenuItem>
        <MenuItem value="Technology" sx={{ color: 'black' }}>Technology</MenuItem>
        <MenuItem value="Art" sx={{ color: 'black' }}>Art</MenuItem>
        <MenuItem value="Social" sx={{ color: 'black' }}>Social</MenuItem>
      </TextField>
    </Box>
  );
};

export default GeneralInfo;