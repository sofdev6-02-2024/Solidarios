'use client';

import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface Event {
  name: string;
  description: string;
  category: string;
  eventDate: string;
  location: {
    latitude: number;
    longitude: number;
  };
  venue: string;
  address: string;
  ticketPrice: number;
  coverPhotoUrl: string;
  attendanceTrackingEnabled: boolean;
  capacity: number;
}

export default function CreateEvent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/unauthorized');
      router.refresh();
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <main>
        <h1 className="text-4xl text-center">Create Event</h1>
        <div className="text-center text-2xl">Loading...</div>
      </main>
    );
  }

  if (session) {
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      const postBody: Event = {
        name: 'Wilsterman',
        description: 'A fun and engaging event',
        category: 'Music',
        eventDate: '2024-10-30T20:29:28.738Z',
        location: {
          latitude: 40.7128,
          longitude: -74.006,
        },
        venue: 'Downtown Hall',
        address: '123 Main St, New York, NY',
        ticketPrice: 1000,
        coverPhotoUrl: 'https://example.com/photo.jpg',
        attendanceTrackingEnabled: true,
        capacity: 100,
      };

      try {
        const resp = await fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        });

        if (resp.ok) {
          router.push('/');
          router.refresh();
        } else {
          const json = await resp.json();
          setErrorMsg('Unable to call the API: ' + json.error);
        }
      } catch (err) {
        setErrorMsg('Unable to call the API: ' + (err as Error).message);
      }
    };

    return (
      <main>
        {errorMsg && <div className="text-red-500">{errorMsg}</div>}
        <button onClick={handleSubmit}>Send Event</button>
      </main>
    );
  }

  redirect('/unauthorized');
}
