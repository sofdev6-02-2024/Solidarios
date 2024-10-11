import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#490075",
      light: "#7c43bd",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1C39FF",
      light: "#7c43bd",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "#000",
    },
  },

  typography: {
    displayLarge: {
      fontSize: "3.5rem",
      fontWeight: 700,
    },
    display: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h1: {
      fontSize: "1.875rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.625rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.375rem",
      fontWeight: 600,
    },
    bodyLarge: {
      fontSize: "1.125rem",
      fontWeight: 400,
    },
    body: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    caption: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    tiny: {
      fontSize: "0.75rem",
      fontWeight: 400,
    },
  },
});

export default theme;
