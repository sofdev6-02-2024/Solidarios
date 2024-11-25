import Layout from '@/components/Layout';
import { Box, Typography } from '@mui/material';

const EditEventSection = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Layout>
        <Typography color="primary" variant="display">
          Edit Event{' '}
        </Typography>
        <Typography variant="display">Section</Typography>
      </Layout>
    </Box>
  );
};

export default EditEventSection;
