import React from 'react';
import { Box, Typography, TextField, Button, Divider, MenuItem, InputAdornment, Switch } from '@mui/material';
import { CalendarToday, AccessTime, LocationOn, AttachMoney } from '@mui/icons-material';

export default function CreateEvent() {
  return (
    <Box p={4}>
      <Typography variant="h4" component="h1" color="primary" fontWeight="bold">
        Create <span style={{ color: '#0066FF' }}>Event</span>
      </Typography>

      {/* Image Upload */}
      <Box mt={2} mb={4} textAlign="center" style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
        <Typography variant="body1">Upload Image</Typography>
      </Box>

      {/* Steps Sidebar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Main Content */}
        <Box flex={3}>
          {/* General Event Information */}
          <Box mb={4} p={3} border="1px solid #d0d0d0" borderRadius="8px">
            <Typography variant="h6" fontWeight="bold">General event information</Typography>
            <TextField label="Title" fullWidth margin="normal" defaultValue="Ted x talk - UMSS" />
            <TextField label="Short Description" fullWidth margin="normal" defaultValue="Ted x talk - UMSS" />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
            />
            <TextField label="Category" fullWidth margin="normal" select>
              <MenuItem value="Conference">Conference</MenuItem>
              <MenuItem value="Workshop">Workshop</MenuItem>
              <MenuItem value="Networking">Networking</MenuItem>
            </TextField>
          </Box>

          {/* Date and Location */}
          <Box mb={4} p={3} border="1px solid #d0d0d0" borderRadius="8px">
            <Typography variant="h6" fontWeight="bold">Date and location</Typography>
            <Box display="flex" gap={2} mt={2}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><CalendarToday /></InputAdornment>,
                }}
              />
              <TextField
                label="Hour"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AccessTime /></InputAdornment>,
                }}
              />
            </Box>
            <TextField
              label="Location"
              fullWidth
              margin="normal"
              defaultValue="Juan de la Rosa #1213, Cochabamba Bolivia"
              InputProps={{
                startAdornment: <InputAdornment position="start"><LocationOn /></InputAdornment>,
              }}
            />
          </Box>

          {/* Price and Capacity */}
          <Box mb={4} p={3} border="1px solid #d0d0d0" borderRadius="8px">
            <Typography variant="h6" fontWeight="bold">Price and capacity</Typography>
            <Box display="flex" gap={2} mt={2}>
              <TextField label="Capacity" fullWidth margin="normal" defaultValue="500" />
              <TextField
                label="Ticket price"
                fullWidth
                margin="normal"
                defaultValue="0.00"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AttachMoney /></InputAdornment>,
                }}
              />
            </Box>
          </Box>

          {/* Additional Settings */}
          <Box mb={4} p={3} border="1px solid #d0d0d0" borderRadius="8px">
            <Typography variant="h6" fontWeight="bold">Additional Settings</Typography>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography>Enable attendance control for the event</Typography>
              <Switch />
            </Box>
          </Box>
        </Box>

        {/* Sidebar */}
        <Box flex={1} ml={4}>
          <Box p={3} border="1px solid #d0d0d0" borderRadius="8px" mb={2}>
            <Typography variant="h6" fontWeight="bold">Steps</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography color="primary">General information</Typography>
            <Typography>Date and location</Typography>
            <Typography>Price and capacity</Typography>
          </Box>

          <Box p={3} border="1px solid #d0d0d0" borderRadius="8px" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add Collaborators</Typography>
            {/* Add collaborators input */}
          </Box>

          <Box p={3} border="1px solid #d0d0d0" borderRadius="8px" mb={2}>
            <Typography variant="h6" fontWeight="bold">Set Reminder</Typography>
            <TextField select fullWidth>
              <MenuItem value="1_day_before">1 day before</MenuItem>
              <MenuItem value="1_hour_before">1 hour before</MenuItem>
            </TextField>
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>Create event</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}