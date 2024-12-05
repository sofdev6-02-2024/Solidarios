import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface AttendanceModalProps {
  open: boolean;
  onClose: () => void;
  onRegisterAttendance: (type: 'event' | 'activity') => void;
  userId: string;
}

const AttendanceModal = ({ open, onClose, onRegisterAttendance, userId }: AttendanceModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register Attendance</DialogTitle>
      <DialogContent>
        <Typography>
          The ticket belongs to user <strong>{userId}</strong>. Would you like to register attendance for the event or for an activity?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onRegisterAttendance('event')} color="primary" variant="contained">
          Event
        </Button>
        <Button onClick={() => onRegisterAttendance('activity')} color="secondary" variant="contained">
          Activity
        </Button>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceModal;