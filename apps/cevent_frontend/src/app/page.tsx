'use client';

import { RootState } from '@/redux/store';
import { routes } from '@/utils/navigation/Routes';
import { Button, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthID } from '@/redux/slices/authSlice';
import { setUserInfo } from '@/redux/slices/userSlice';
import AuthStatus from '@/components/AuthStatus';

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

      <Button
        variant="contained"
        color="secondary"
        onClick={handleCreateEvent}
        sx={{ width: '200px' }}
      >
        Create Event
      </Button>

      <AuthStatus />
    </Stack>
  );
}
