"use client";

import { AppBar, Toolbar, IconButton, Button, InputBase } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { MdSearch, MdNotifications } from "react-icons/md";
import { Box } from "@mui/system";
import { useRouter, usePathname } from "next/navigation";
import { routes } from "@/utils/navigation/Routes";
import { useTheme } from "@mui/material/styles";
import styles from "@/styles/components/Header.module.css";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme(); // Accede al tema

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const isActive = (route: string) => pathname === route;

  return (
    <AppBar position="static" style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.secondary, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton size="large" edge="start" className={styles.logoButton}>
            <img
              src="/LogoCevent.svg"
              alt="logo"
              style={{ height: 50 }}
              onClick={() => handleNavigation(routes.home)}
            />
          </IconButton>
          <Button
            className={`${styles.navButton} ${isActive(routes.home) ? styles.activeNavButton : ""}`}
            onClick={() => handleNavigation(routes.home)}>
            Home
          </Button>
          <Button
            className={`${styles.navButton} ${isActive(routes.myTickets) ? styles.activeNavButton : ""}`} 
            onClick={() => handleNavigation(routes.myTickets)}>
            My Tickets
          </Button>
          <Button
            className={`${styles.navButton} ${isActive(routes.myEvents) ? styles.activeNavButton : ""}`} 
            onClick={() => handleNavigation(routes.myEvents)}>
            My Events
          </Button>
        </Box>

        <Box className={styles.searchBox}>
          <MdSearch className={styles.searchIcon} />
          <InputBase
            placeholder="Search"
            className={styles.searchInput}
          />
        </Box>

        <IconButton size="large" color="inherit">
          <MdNotifications />
        </IconButton>

        <AccountCircle
          style={{ fontSize: 40 }} 
          onClick={() => handleNavigation(routes.profile)}
          alt="Profile Icon"
        />
      </Toolbar>
    </AppBar>
  );
}
