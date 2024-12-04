import Layout from '@/components/Layout';
import { Box, Typography, Alert, Paper } from '@mui/material';
import { stylesPage } from '../../_styles/homeEventSectionStyle';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import CardEventSummary from '../CardEventInfo';
import { fetchGetTicketByQr } from '@/services/TicketService';
import { useEffect, useState } from 'react';
import QrScanner from 'react-qr-scanner'; // Importa react-qr-scanner

export interface SectionProps {
  event: EventDetailDto;
}

const HomeSection = ({ event }: SectionProps) => {
  const [qrContent, setQrContent] = useState<string | null>(null);
  const [ticketInfo, setTicketInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleScan = (data: string | null) => {
    if (data) {
      setQrContent(data.text);
    } else {
      console.log('No QR detected');
    }
  };


  const handleError = (err: any) => {
    console.error(err);
  };

  useEffect(() => {
    const verifyQrContent = async () => {
      try {
        if (qrContent) {
          const ticket = await fetchGetTicketByQr(qrContent);
          if (ticket) {
            setTicketInfo(`Ticket found: ${ticket.userId}`);
          } else {
            setTicketInfo('No ticket found for the provided QR content.');
          }
        }
      } catch (err: any) {
        setError('An error occurred while verifying the QR content.');
        console.error(err);
      }
    };

    verifyQrContent();
  }, [qrContent]); 

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

        <Paper
          elevation={3}
          sx={{
            padding: 2,
            marginTop: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 400,
            width: '100%',
            position: 'relative',
          }}
        >
          <QrScanner
            delay={300}
            style={{ width: '100%', height: '100%' }}
            onError={handleError}
            onScan={handleScan}
          />
        </Paper>

        {ticketInfo && <Alert severity="info">{ticketInfo}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Layout>
    </Box>
  );
};

export default HomeSection;
