'use client';
import { useRouter } from 'next/navigation';

export default function MyEventsPage() {
  const router = useRouter();

  const handleCreateEvent = () => {
    router.push('/create_event');
  };

  return (
    <div>
      <h1>My Events</h1>
      <button onClick={handleCreateEvent}> 
        Create Event
      </button>
    </div>
  );
}
