"use client";

import { AppBar, Toolbar, IconButton, Button, InputBase } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { MdSearch, MdNotifications } from "react-icons/md";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/navigation/Routes";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#f4f4f4", color: "#000", boxShadow: "none" }}>
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

          <Button className={styles.navButton} onClick={() => handleNavigation(routes.home)}>Home</Button>
          <Button className={styles.navButton} onClick={() => handleNavigation(routes.myTickets)}>My Tickets</Button>
          <Button className={styles.navButton} onClick={() => handleNavigation(routes.myEvents)}>My Events</Button>
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
