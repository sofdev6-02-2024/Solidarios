'use client';

import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function CreateEvent() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
    return (
      <main>
        <div>Create Event</div>
      </main>
    );
  }

  redirect('/unauthorized');
}
