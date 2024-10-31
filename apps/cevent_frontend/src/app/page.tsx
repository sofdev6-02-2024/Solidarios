'use client';

import { RootState } from '@/redux/store';
import { routes } from '@/utils/navigation/Routes';
import { Button, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthID } from '@/redux/slices/authSlice';
import { setUserInfo } from '@/redux/slices/userSlice';
import Layout from '@/components/Layout';
import { EventCategory } from '@/utils/interfaces/Categories';
import CategoryEventSection from '@/components/EventSection/CategoryEventSection';

export default function Home() {
  return (
    <Layout>
      <CategoryEventSection category={EventCategory.All} />
    </Layout>
  );
}
