import React from 'react';
import { Typography, Button, Container, Grid, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { AccountCircle } from '@mui/icons-material';
import '@/styles/sign-auth/signin.css';

export default function ProfilePage() {
  return (
    <Container className="container">
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Box className="sign-in-box">
            <Typography variant="h1" gutterBottom>
              Sign In
            </Typography>
            <AccountCircle className="icon" />
            <Button variant="outlined" startIcon={<GoogleIcon />} className="google-button">
              Continue with Google
            </Button>
            <Button variant="contained" startIcon={<FacebookIcon />} className="facebook-button">
              Continue with Facebook
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box className="welcome-box">
            <img src="/LogoCevent.svg" alt="logo" className="logo" />
            <Typography variant="h4" gutterBottom>
              Welcome back
            </Typography>
            <Typography variant="body1" className="welcome-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography>
            <Button variant="contained" className="sign-up-button">
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
