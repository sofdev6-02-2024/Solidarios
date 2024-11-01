import React from 'react';
import { Box, Button } from '@mui/material';

const Sidebar = () => {
  return (
    <Box>
      <Button variant="contained" color="primary">Save</Button>
      <Button variant="outlined" color="secondary">Cancel</Button>
    </Box>
  );
};

export default Sidebar;
