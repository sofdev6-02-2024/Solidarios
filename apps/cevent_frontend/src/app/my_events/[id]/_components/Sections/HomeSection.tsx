import Layout from '@/components/Layout';
import { Box, Typography } from '@mui/material';
import { stylesPage } from '../../_styles/homeEventSectionStyle';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import CardEventInfo from '@/app/[id]/_components/CardEventInfo';
import CardEventSummary from '../CardEventInfo';

export interface SectionProps {
    event: EventDetailDto;
} 

const HomeSection = ({ event }: SectionProps) => {
  return (
    <Box sx={stylesPage.container}>
      <Layout>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          gap={2}
        >
          <Typography color="primary" variant="display">
            Event
          </Typography>
          <Typography variant="display">Management</Typography>
        </Box>
        <CardEventSummary eventData={event} />
      </Layout>
    </Box>
  );
};

export default HomeSection;
