'use client'
import { redirect, useRouter } from 'next/navigation';
import { routes } from '@/utils/navigation/Routes';
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function MyTicketsPage() {
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
  if (session)
  {
    return(
      <div>
        <h1>My Tickets</h1>
      </div>
    );  
  }
  redirect('/unauthorized')
}
