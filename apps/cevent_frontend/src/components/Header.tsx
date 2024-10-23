import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { MdAccountBox } from "react-icons/md";

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "background.default" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MdAccountBox />
        </IconButton>
        <Typography  variant="h3" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button variant="contained">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
