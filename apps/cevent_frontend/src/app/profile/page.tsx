'use client';
import AuthStatus from '@/components/AuthStatus';
import Layout from '@/components/Layout';
import { useRoles } from '@/hooks/use-roles';
import { RootState } from '@/redux/store';
import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import CardInfoUser from './_components/CardInfoUser';
import EditEventCard from './_components/EditProfileCard';
import UploadImage from '@/components/UploadImage';
import { UploadWidgetResult } from '@/utils/interfaces/UploadImage';
import { setUserInfo } from '@/redux/slices/userSlice';
import { updateUser } from '@/services/UserService';

export default function ProfilePage() {
  const { hasRole, roles } = useRoles();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const onCompleteUploadImage = (file: UploadWidgetResult) => {
    if (user) {
      const userUpdated: UserInterface = {
        ...user,
        photoUrl: file.fileUrl,
      };
      updateUser(userUpdated).then((response) => {
        if (response) {
          dispatch(setUserInfo(userUpdated));
        }
      });
    }
  };

  return (
    <Box sx={{ minHeight: '70vh' }}>
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height={'100%'}
        >
          <Avatar
            alt={user?.name}
            src={user?.photoUrl}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h4" mt={2}>
            {user?.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user?.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user?.phoneNumber}
          </Typography>
          {hasRole('admin') && (
            <Typography variant="body2" color="secondary" mt={1}>
              Admin Account
            </Typography>
          )}
          <UploadImage onComplete={onCompleteUploadImage} />
        </Box>
        {openEdit && user ? (
          <EditEventCard user={user} setOpenEdit={setOpenEdit} />
        ) : (
          <CardInfoUser
            user={user as UserInterface}
            setOpenEdit={setOpenEdit}
          />
        )}
      </Layout>
    </Box>
  );
}
