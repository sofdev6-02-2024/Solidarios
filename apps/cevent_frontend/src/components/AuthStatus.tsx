'use client';

import { Button, Typography } from '@mui/material';
import { Session } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

interface CustomSession extends Session {
  error?: string;
}

async function keycloakSessionLogOut(): Promise<void> {
  try {
    await fetch(`/api/auth/logout`, { method: 'GET' });
  } catch (err) {
    console.error(err);
  }
}

export default function AuthStatus(): JSX.Element {
  const { data: session, status } = useSession();
  const customSession = session as CustomSession;

  useEffect(() => {
    if (
      status !== 'loading' &&
      customSession &&
      customSession?.error === 'RefreshAccessTokenError'
    ) {
      signOut({ callbackUrl: '/' });
    }
  }, [customSession, status]);

  if (status === 'loading') {
    return <Typography variant="h6">Loding ...</Typography>;
  } else if (customSession) {
    return (
      <div>
        <Typography variant="h6">Welcome, {session?.user?.name}.</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            keycloakSessionLogOut().then(() => {
              signOut({ callbackUrl: '/' });
            });
          }}
          sx={{ width: '200px' }}
        >
          Log Out
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h6">Please log in.</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => signIn('keycloak')}
        sx={{ width: '200px' }}
      >
        Login
      </Button>
    </div>
  );
}
