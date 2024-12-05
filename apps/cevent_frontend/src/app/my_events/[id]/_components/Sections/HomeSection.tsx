import Layout from '@/components/Layout';
import { Box, Typography, Alert, Paper, Button } from '@mui/material';
import { stylesPage } from '../../_styles/homeEventSectionStyle';
import { EventDetailsDto } from '@/utils/interfaces/EventInterfaces';
import CardEventSummary from '../CardEventInfo';
import { fetchGetTicketByQr } from '@/services/TicketService';
import { useEffect, useState } from 'react';
import QrScanner from 'react-qr-scanner';
import AttendanceModal from './AttendanceModal';
import { AttendanceData } from '@/utils/interfaces/EventInterfaces';
import { createAttendance } from '@/services/AttendanceService';

export interface SectionProps {
  event: EventDetailsDto;
}

const HomeSection = ({ event }: SectionProps) => {
  const [qrContent, setQrContent] = useState<string | null>(null);
  const [ticketInfo, setTicketInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ticketUserId, setTicketUserId] = useState<string | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      setQrContent(data.text);
      setIsCameraEnabled(false);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleEnableCamera = () => {
    setIsCameraEnabled(true);
    setQrContent(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRegisterAttendance = async (
    type: 'event' | 'activity',
    activityId?: number,
  ) => {
    try {
      if (!ticketUserId) {
        console.error('No ticket user ID available');
        return;
      }      
      if (type === 'event') {
        console.log('Registering attendance for the event...');

      } else if (type === 'activity' && activityId) {
        const attendanceData: AttendanceData = {
          userId: ticketUserId,
          activityId,
        };

        await createAttendance(attendanceData);        
      }

      setIsModalOpen(false);
      setTicketInfo('Attendance successfully registered!');
    } catch (err) {      
      setError('Failed to register attendance. Please try again.');
    }
  };


  useEffect(() => {
    const verifyQrContent = async () => {
      try {
        if (qrContent) {
          const ticket = await fetchGetTicketByQr(qrContent);
          if (ticket) {
            if (ticket.eventId === event.id) {
              setTicketUserId(ticket.userId);
              setTicketInfo(`Ticket found for user: ${ticket.userId}`);
              setIsModalOpen(true);
            } else {
              setTicketInfo('This ticket does not belong to the current event.');
            }
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
  }, [qrContent, event.id]);

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

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 4 }}
          onClick={handleEnableCamera}
        >
          Activate Camera
        </Button>

        {isCameraEnabled && (
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
        )}

        {ticketInfo && <Alert severity="info">{ticketInfo}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        {ticketUserId && (
          <AttendanceModal
            open={isModalOpen}
            onClose={handleModalClose}
            onRegisterAttendance={handleRegisterAttendance}
            userId={ticketUserId!}
            activities={event.activities}
          />
        )}
      </Layout>
    </Box>
  );
};

export default HomeSection;