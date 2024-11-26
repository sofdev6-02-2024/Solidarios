'use client';
import AuthStatus from '@/components/AuthStatus';
import Layout from '@/components/Layout';
import { useRoles } from '@/hooks/use-roles';
import { RootState } from '@/redux/store';
import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import { Box, Typography, Avatar, Paper, Button } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const { hasRole, roles } = useRoles();
  const user = useSelector((state: RootState) => state.user.userInfo);

  return (
    <Box    sx={{ height: '70vh' }}>
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height={"100%"}
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
        </Box>

        <Box mt={4} display="flex" justifyContent="center">
          <Paper
            elevation={3}
            sx={{ padding: 2, width: '100%', maxWidth: 600 }}
          >
            <Typography variant="h6" gutterBottom>
              Información Personal
            </Typography>
            <Typography variant="body1">Nombre: {user?.name}</Typography>
            <Typography variant="body1">Correo: {user?.email}</Typography>
            <Typography variant="body1">
              Teléfono: {user?.phoneNumber}
            </Typography>
          </Paper>
        </Box>
      </Layout>
    </Box>
  );
}
