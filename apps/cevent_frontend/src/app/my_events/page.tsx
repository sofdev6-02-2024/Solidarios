'use client';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

export default function MyEventsPage() {
  const router = useRouter();

  const handleCreateEvent = () => {
    router.push('/create_event');
  };

  return (
    <div>
      <h1>My Events</h1>
      <Button variant="contained" onClick={handleCreateEvent}>
        Create Event
      </Button>
    </div>
  );
}
