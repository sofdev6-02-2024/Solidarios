import { useRoles } from '@/hooks/use-roles';
import { RootState } from '@/redux/store';
import { keycloakSessionLogOut } from '@/services/AuthService';
import { Avatar, Box, ButtonBase, Drawer, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

interface DrawerProfileProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
}

const DrawerProfile = ({
  isDrawerOpen,
  setIsDrawerOpen,
}: DrawerProfileProps) => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const router = useRouter();
  const { hasRole} = useRoles();

  const handleClickProfile = () => {
    setIsDrawerOpen(false);
    router.push('/profile');
  };

  const handleLogout = () => {
    keycloakSessionLogOut().then(() => {
      signOut({ callbackUrl: '/' });
    });
  };
  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box
        sx={{
          width: 250,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 3,
          gap: 2,
        }}
      >
        <Avatar
          sx={{ width: 80, height: 80 }}
          alt={user?.name}
          src={user?.photoUrl}
        />
        <Typography textAlign={'center'} variant="body">
          {user?.name}
        </Typography>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ButtonBase
            sx={{ width: '100%', paddingTop: 1, paddingBottom: 1 }}
            onClick={handleClickProfile}
          >
            <Typography variant="body">Profile</Typography>
          </ButtonBase>
          {hasRole('admin') && (
            <ButtonBase
              sx={{ width: '100%', paddingTop: 1, paddingBottom: 1 }}
              onClick={() => router.push('/admin')}
            >
              <Typography variant="body">Admin page</Typography>
            </ButtonBase>
          )}
          <ButtonBase
            sx={{ width: '100%', paddingTop: 1, paddingBottom: 1 }}
            onClick={handleLogout}
          >
            <Typography variant="body">Log Out</Typography>
          </ButtonBase>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerProfile;
