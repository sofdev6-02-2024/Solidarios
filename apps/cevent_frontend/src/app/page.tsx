'use client';

import { RootState } from '@/redux/store';
import { routes } from '@/utils/navigation/Routes';
import { Button, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthID } from '@/redux/slices/authSlice';
import { setUserInfo } from '@/redux/slices/userSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userID = useSelector((state: RootState) => state.auth.userID);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const handleLogin = () => {
    dispatch(setAuthID('123'));
    dispatch(
      setUserInfo({
        id: '1',
        fullname: 'John Doe',
        email: 'john@example.com',
      }),
    );
  };

  const handleCreateEvent = () => {
    router.push(routes.createEvent);
  };

  return (
    <Stack spacing={3} alignItems="center" sx={{ mt: 4 }}>
      <Typography variant="h1" textAlign="center">
        Cevent App
      </Typography>

      <Typography variant="h4">
        User ID: {userID || 'No user logged in'}
      </Typography>

      {userInfo ? (
        <Typography variant="h6">
          Welcome, {userInfo.fullname} ({userInfo.email})
        </Typography>
      ) : (
        <Typography variant="h6">Please log in.</Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ width: '200px' }}
      >
        Login
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleCreateEvent}
        sx={{ width: '200px' }}
      >
        Create Event
      </Button>
    </Stack>
  );
}
