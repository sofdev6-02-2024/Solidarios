  import React from 'react';
  import { TextField, FormHelperText, Typography, Box } from '@mui/material'; // Add MenuItem here
  import MenuItem from '@mui/material/MenuItem'; // Import MenuItem

  const GeneralInfo = () => {
    return (
      <Box mb={4} p={3} border="1px solid #d0d0d0" borderRadius="8px">
        <Typography variant="h6" fontWeight="bold">General event information</Typography>
        
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          InputProps={{ style: { color: 'black' } }}
        />
        <FormHelperText>
          Be clear and descriptive with a title that explains what your event is about.
        </FormHelperText>

        <TextField
          label="Short Description"
          fullWidth
          margin="normal"
          InputProps={{ style: { color: 'black' } }}
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
          InputProps={{ style: { color: 'black' } }}
        />
        <FormHelperText>
          Grab people's attention with a brief description of your event. Attendees will see it at the top of your event page.
        </FormHelperText>

        <TextField
          label="Category"
          fullWidth
          margin="normal"
          select
          InputProps={{ style: { color: 'black' } }}
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