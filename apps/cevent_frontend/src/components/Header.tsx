"use client"; // <- Esto marca el componente como un Client Component

import { AppBar, Toolbar, IconButton, Button, InputBase, Avatar } from "@mui/material";
import { MdSearch, MdNotifications } from "react-icons/md";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/navigation/Routes";

export default function Header() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#f4f4f4", color: "#000", boxShadow: "none" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton size="large" edge="start" sx={{ mr: 2 }}>
            <img src="/Logo.svg" alt="logo" style={{ height: 50 }} 
              onClick={() => handleNavigation(routes.home)} />
          </IconButton>

          <Button color="inherit" onClick={() => handleNavigation(routes.home)}>Home</Button>
          <Button color="inherit" onClick={() => handleNavigation(routes.myTickets)}>My Tickets</Button>
          <Button color="inherit" onClick={() => handleNavigation(routes.myEvents)}>My Events</Button>        
        </Box>

        <Box sx={{ position: "relative", display: "flex", alignItems: "center", marginRight: 2 }}>
          <MdSearch style={{ position: "absolute", left: 10 }} />
          <InputBase
            placeholder="Search"
            sx={{
              pl: 5,
              pr: 2,
              py: 0.5,
              backgroundColor: "#fff",
              borderRadius: 10,
              width: "280px",
              border: "1px solid #ccc",
            }}
          />
        </Box>

        <IconButton size="large" color="inherit">
          <MdNotifications />
        </IconButton>

        <Avatar alt="User Avatar" src="path-to-user-avatar" 
          onClick={() => handleNavigation(routes.profile)} />
      </Toolbar>
    </AppBar>
  );
}
