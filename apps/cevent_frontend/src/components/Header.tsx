'use client';

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { MdSearch, MdNotifications } from 'react-icons/md';
import { Box } from '@mui/system';
import { useRouter, usePathname } from 'next/navigation';
import { routes } from '@/utils/navigation/Routes';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import styles from '@/styles/components/Header.module.css';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigation = (route: string) => {
    router.push(route);
    setDrawerOpen(false);
  };

  const isActive = (route: string) => pathname === route;

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton size="large" edge="start" className={styles.logoButton}>
            <img
              src="/LogoCevent.svg"
              alt="logo"
              style={{ height: 50 }}
              onClick={() => handleNavigation(routes.home)}
            />
          </IconButton>

          {!isMobile && (
            <>
              <Button
                className={`${styles.navButton} ${isActive(routes.home) ? styles.activeNavButton : ''}`}
                onClick={() => handleNavigation(routes.home)}
              >
                Home
              </Button>
              <Button
                className={`${styles.navButton} ${isActive(routes.myTickets) ? styles.activeNavButton : ''}`}
                onClick={() => handleNavigation(routes.myTickets)}
              >
                My Tickets
              </Button>
              <Button
                className={`${styles.navButton} ${isActive(routes.myEvents) ? styles.activeNavButton : ''}`}
                onClick={() => handleNavigation(routes.myEvents)}
              >
                My Events
              </Button>
            </>
          )}
        </Box>

        {!isMobile && (
          <Box className={styles.searchBox}>
            <MdSearch className={styles.searchIcon} />
            <InputBase placeholder="Search" className={styles.searchInput} />
          </Box>
        )}

        {isMobile ? (
          <>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              className={styles.burgerMenuButton}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={() => setDrawerOpen(false)}
                onKeyDown={() => setDrawerOpen(false)}
              >
                <List>
                  <ListItem
                    button
                    component="div"
                    onClick={() => handleNavigation(routes.home)}
                    className={styles.drawerMenuItem}
                  >
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem
                    button
                    component="div"
                    onClick={() => handleNavigation(routes.myTickets)}
                    className={styles.drawerMenuItem}
                  >
                    <ListItemText primary="My Tickets" />
                  </ListItem>
                  <ListItem
                    button
                    component="div"
                    onClick={() => handleNavigation(routes.myEvents)}
                    className={styles.drawerMenuItem}
                  >
                    <ListItemText primary="My Events" />
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    component="div"
                    onClick={() => handleNavigation(routes.profile)}
                    className={styles.drawerMenuItem}
                  >
                    <ListItemText primary="Profile" />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            <IconButton size="large" color="inherit">
              <MdNotifications />
            </IconButton>

            <IconButton
              size="large"
              onClick={() => handleNavigation(routes.profile)}
            >
              <AccountCircle style={{ fontSize: 40 }} />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
