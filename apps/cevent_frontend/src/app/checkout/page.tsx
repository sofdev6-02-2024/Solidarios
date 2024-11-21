'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import checkoutStyles from '@/styles/components/CheckoutStyles';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';

export default function MyEventsPage() {
  const searchParams = useSearchParams();
  const eventName = searchParams.get('eventName') || 'Unnamed Event';
  const quantity = searchParams.get('quantity') || '0';
  const pricePerTicket = searchParams.get('pricePerTicket') || '0';
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '0');
  const coverPhotoUrl = searchParams.get('coverPhotoUrl'); // Imagen del evento

  // Calculate platform fee (3% of total price)
  const platformFee = totalPrice * 0.03;

  // Calculate final total price after adding the platform fee
  const finalTotalPrice = totalPrice + platformFee;

  return (
    <Box sx={checkoutStyles.container}>
      <Typography sx={checkoutStyles.title}>Checkout</Typography>

      <Grid container spacing={4}>
        {/* Left Section: Payment Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={checkoutStyles.formContainer}>
            <Box sx={checkoutStyles.tabs}>
              <Button sx={checkoutStyles.activeTab}>Pay By Card</Button>
              <Button sx={checkoutStyles.inactiveTab}>Pay By QR</Button>
            </Box>

            <Typography sx={checkoutStyles.sectionTitle}>Card Payment</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name (optional)"
                  variant="outlined"
                  sx={checkoutStyles.inputField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name (optional)"
                  variant="outlined"
                  sx={checkoutStyles.inputField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address (optional)"
                  variant="outlined"
                  sx={checkoutStyles.inputField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number (optional)"
                  variant="outlined"
                  sx={checkoutStyles.inputField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  variant="outlined"
                  sx={checkoutStyles.inputField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiration Date"
                  variant="outlined"
                  sx={checkoutStyles.inputField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVC"
                  variant="outlined"
                  sx={checkoutStyles.inputField}
                />
              </Grid>
            </Grid>

            <Button variant="contained" sx={checkoutStyles.payNowButton} fullWidth>
              Pay Now
            </Button>
          </Paper>
        </Grid>

        {/* Right Section: Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={checkoutStyles.orderSummary}>
            {/* Imagen del evento */}
            {coverPhotoUrl && (
              <img
                src={coverPhotoUrl} // Imagen dinámica
                alt="Event Cover"
                style={{
                  width: '100%',        // Ancho completo
                  height: 'auto',       // Mantiene la proporción
                  borderRadius: '8px',  // Bordes redondeados
                  marginBottom: '16px', // Espacio debajo de la imagen
                }}
              />
            )}

            {/* Resumen de la orden */}
            <Typography sx={checkoutStyles.sectionTitle}>Order Summary</Typography>
            <Box sx={checkoutStyles.orderRow}>
              <Typography>{eventName}   x{quantity}</Typography>
              <Typography>
                $ {parseFloat(pricePerTicket) * parseInt(quantity, 10)} 
              </Typography>
            </Box>
            <Box sx={checkoutStyles.totalRow}>
              <Typography>Platform  (3%)</Typography>
              <Typography>${platformFee.toFixed(2)} </Typography>
            </Box>
            <Divider sx={checkoutStyles.divider} />
            <Box sx={checkoutStyles.totalRow}>
              <Typography>Total Price</Typography>
              <Typography>${finalTotalPrice.toFixed(2)} </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
