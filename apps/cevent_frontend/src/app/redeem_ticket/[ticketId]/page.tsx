'use client';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormGroup,
  FormHelperText,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function RedeemTicket() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
    code: '',
    documentType: '',
    documentNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
    code: '',
    documentType: '',
    documentNumber: '',
    email: '',
  });

  const validate = () => {
    const newErrors = {
      name: '',
      lastName: '',
      phoneNumber: '',
      code: '',
      documentType: '',
      documentNumber: '',
      email: '',
    };

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    if (!formData.code) newErrors.code = 'Code is required';

    if (!formData.documentType)
      newErrors.documentType = 'Please select a document type';

    if (!formData.documentNumber)
      newErrors.documentNumber = 'Document number is required';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fff',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          style={{
            fontWeight: 'bold',
            fontSize: '2rem',
            textAlign: 'center',
            color: '#000',
          }}
        >
          Redeem Tickets
        </Typography>

        <FormGroup>
          {/* Row 1: Name and Last Name */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <FormControl
              variant="outlined"
              fullWidth
              error={Boolean(errors.name)}
            >
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                helperText={errors.name}
                sx={{ borderColor: '#1976d2' }}
              />
            </FormControl>

            <FormControl
              variant="outlined"
              fullWidth
              error={Boolean(errors.lastName)}
            >
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                helperText={errors.lastName}
                sx={{ borderColor: '#1976d2' }}
              />
            </FormControl>
          </Box>

          {/* Row 2: Phone Number and Code */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              marginTop: 2,
            }}
          >
            <FormControl
              variant="outlined"
              fullWidth
              error={Boolean(errors.phoneNumber)}
            >
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                helperText={errors.phoneNumber}
                sx={{ borderColor: '#1976d2' }}
              />
            </FormControl>

            <FormControl
              variant="outlined"
              fullWidth
              error={Boolean(errors.code)}
            >
              <TextField
                label="Code"
                variant="outlined"
                fullWidth
                name="code"
                value={formData.code}
                onChange={handleChange}
                helperText={errors.code}
                sx={{ borderColor: '#1976d2' }}
              />
            </FormControl>
          </Box>

          {/* Row 3: Type of Document and Document Number */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              marginTop: 2,
            }}
          >
            <FormControl
              fullWidth
              variant="outlined"
              error={Boolean(errors.documentType)}
            >
              <InputLabel>Type of Document</InputLabel>
              <Select
                label="Type of Document"
                value={formData.documentType}
                onChange={handleChange}
                name="documentType"
              >
                <MenuItem value="">Select Document</MenuItem>
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="passport">Passport</MenuItem>
                <MenuItem value="drivers_license">Driver's License</MenuItem>
              </Select>
              <FormHelperText>{errors.documentType}</FormHelperText>
            </FormControl>

            <FormControl
              variant="outlined"
              fullWidth
              error={Boolean(errors.documentNumber)}
            >
              <TextField
                label="Document Number"
                variant="outlined"
                fullWidth
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                helperText={errors.documentNumber}
                sx={{ borderColor: '#1976d2' }}
              />
            </FormControl>
          </Box>

          {/* Row 4: Email Address */}
          <Box sx={{ marginTop: 2 }}>
            <FormControl
              variant="outlined"
              fullWidth
              error={Boolean(errors.email)}
            >
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                helperText={errors.email}
                sx={{ borderColor: '#1976d2' }}
              />
            </FormControl>
            <FormHelperText>
              This email will be used to send you the ticket
            </FormHelperText>
          </Box>

          {/* Confirm Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: '100%',
                padding: '12px 0',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: 2,
              }}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </Box>
  );
}
