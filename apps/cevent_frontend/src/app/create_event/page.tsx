import React from 'react';
import { Typography, Button, Container, Grid, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import '@/styles/sign-auth/signup.css';

export default function Signup() {
  return (
    <Container maxWidth="lg" className="container">
      <Grid container spacing={1}> 
        <Grid item xs={12} md={6}>
          <Box className="box-login">
            <img src="/LogoCevent.svg" alt="logo" className="logo" />
            <Typography variant="h5" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body1" className='welcome'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography>
            <Button variant="contained" className="sign-in-button">
              Sign In
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="box-signup">
            <Typography variant="h1" gutterBottom>
              Sign Up
            </Typography>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              className="google-button"
            >
              Continue with Google
            </Button>
            <Button
              variant="contained"
              startIcon={<FacebookIcon />}
              className="facebook-button"
            >
              Continue with Facebook
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}