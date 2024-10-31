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

  const handleGetAllEvent = async () => {
    const resp = await fetch('/api/events?page=1&pageSize=10');
    const data = await resp.json();
    alert('Check the console');
    console.log(data);
  };

  const handleGetEventById = async () => {
    const resp = await fetch('/api/events?id=2');
    const data = await resp.json();
    alert('Check the console');
    console.log(data);
  };

  const handleGetAllEventHomeDTOs = async () => {
    const resp = await fetch('/api/events?homepage=true&page=1&pageSize=10');
    const data = await resp.json();
    alert('Check the console');
    console.log(data);
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
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGetAllEvent}
        sx={{ width: '200px' }}
      >
        Get All Events
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGetEventById}
        sx={{ width: '200px' }}
      >
        Get by ID Events
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGetAllEventHomeDTOs}
        sx={{ width: '200px' }}
      >
        Get All HomeDTOs Events
      </Button>
      <AuthStatus />
    </Stack>
  );
}
