import React from 'react';
import { TextField, FormHelperText, Typography, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const GeneralInfo = () => {
  return (
    <Box mb={4} p={3} border="1px solid #4a88e9" borderRadius="8px">
      <Typography variant="h6" fontWeight="bold">General event information</Typography>
      
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        InputProps={{
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
          },
          style: { color: 'black' }
        }}
        className="info-box"
      />
      <FormHelperText>
        Be clear and descriptive with a title that explains what your event is about.
      </FormHelperText>

      <TextField
        label="Short Description"
        fullWidth
        margin="normal"
        InputProps={{
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
          },
          style: { color: 'black' }
        }}
      />
      <FormHelperText>
        Set a short description for your event to give a brief summary of the event.
      </FormHelperText>

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        InputProps={{
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
          },
          style: { color: 'black' }
        }}
      />
      <FormHelperText>
        Grab people's attention with a brief description of your event. Attendees will see it at the top of your event page.
      </FormHelperText>

      <TextField
        label="Category"
        fullWidth
        margin="normal"
        select
        InputProps={{
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a88e9',
            },
          },
          style: { color: 'black' }
        }}
      >
        <MenuItem value="Conference">Conference</MenuItem>
        <MenuItem value="Workshop">Workshop</MenuItem>
        <MenuItem value="Networking">Networking</MenuItem>
      </TextField>
      <FormHelperText>
        Correctly categorize the type of event you are organizing.
      </FormHelperText>
    </Box>
  );
};

export default GeneralInfo;
