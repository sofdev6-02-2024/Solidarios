'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@mui/material';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <div>
      <h1>Profile</h1>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Log out
      </Button>
    </div>
  );
}
