import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#035AE1',
      light: '#7c43bd',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0A2140',
      light: '#7c43bd',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#fff',
      secondary: '#000',
    },
  },

  typography: {
    displayLarge: {
      fontSize: '3.5rem',
      fontWeight: 700,
      color: '#000',
    },
    display: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#000',
    },
    h1: {
      fontSize: '1.875rem',
      fontWeight: 700,
      color: '#000',
    },
    h2: {
      fontSize: '1.625rem',
      fontWeight: 600,
      color: '#000',
    },
    h3: {
      fontSize: '1.375rem',
      fontWeight: 600,
      color: '#000',
    },
    bodyLarge: {
      fontSize: '1.125rem',
      fontWeight: 400,
      color: '#000',
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#000',
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#000',
    },
    tiny: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: '#000',
    },
  },
});

export default theme;
