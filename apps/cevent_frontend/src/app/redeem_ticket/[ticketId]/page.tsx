'use client';
import { getTicketById, validateTicket } from '@/services/TicketService';
import { useParams } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormGroup,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { TicketValidatedDto } from '@/utils/interfaces/TicketInterfaces';
import { useRouter } from 'next/navigation';
import '@/styles/components/redeemTicket.css';
import { RegistrationInputDto } from '@/utils/interfaces/Registration';
import { registerRegistration } from '@/services/RegistrationService';

export default function RedeemTicket() {
  const params = useParams();
  const id = params.ticketId;
  const router = useRouter();

  const [ticket, setTicket] = useState<TicketValidatedDto | null>(null);
  const [formData, setFormData] = useState<RegistrationInputDto>({
    name: '',
    lastName: '',
    phoneNumber: '',
    ticketId: id.toString(),
    eventId: -1,
    email: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({
    name: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    if (id) {
      getTicketById(id.toString())
        .then((data) => {
          if (data === null || data.isUsed) {
            router.push('/not_found');
          } else {
            setTicket(data);
          }
        })
        .catch((error) => {
          console.error(error);
          router.push('/not_found');
        });
    }
  }, [id, router]);

  useEffect(() => {
    formData.eventId = Number(ticket?.eventId);
  }, [ticket]);

  type FormData = {
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };

  type Errors = Partial<Record<keyof FormData, string>>;

  const validate = (): boolean => {
    const validators: Record<keyof FormData, (value: string) => string> = {
      name: (value) => (value ? '' : 'Name is required'),
      lastName: (value) => (value ? '' : 'Last Name is required'),
      phoneNumber: (value) => {
        if (!value) return 'Phone number is required';
        if (!/^[0-9]{10}$/.test(value)) return 'Phone number must be 10 digits';
        return '';
      },
      email: (value) => {
        if (!value) return 'Email is required';
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      },
    };

    const newErrors: Errors = {};
    let hasErrors = false;

    for (const [field, validateField] of Object.entries(validators) as [
      keyof FormData,
      (value: string) => string,
    ][]) {
      const error = validateField(formData[field] as string);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    }

    setErrors(newErrors);

    return !hasErrors;
  };

  const handleSubmit = async () => {
    if (validate()) {
      await registerRegistration(formData);
      if (ticket) {
        await validateTicket(ticket.qrContent);
      }
    }
  };

  const handleChange = (e: any) => {
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
        height: '100%',
        backgroundColor: '#fff',
        padding: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          backgroundColor: 'white',
          padding: 4,

          '@media (max-width: 600px)': {
            padding: 3,
            maxWidth: '100%',
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '2rem',
            textAlign: 'center',
            color: '#000',
            '@media (max-width: 600px)': {
              fontSize: '1.5rem',
            },
            marginBlock: '4rem',
          }}
        >
          Redeem Tickets
        </Typography>

        <FormGroup>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
            }}
          >
            <FormControl variant="outlined" color="primary" fullWidth>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                className="text-field"
                helperText={errors.name}
              />
            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                className="text-field"
                helperText={errors.lastName}
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              marginTop: 2,
              '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
            }}
          >
            <FormControl variant="outlined" fullWidth>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={Boolean(errors.phoneNumber)}
                className="text-field"
                helperText={errors.phoneNumber}
              />
            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <TextField
                label="Code"
                variant="outlined"
                fullWidth
                name="code"
                value={id}
                onChange={handleChange}
                disabled={true}
              />
            </FormControl>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                className="text-field"
                helperText={
                  errors.email ||
                  'This email will be used to send you the ticket'
                }
              />
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: '50%',
                padding: '12px 0',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: 2,
                '@media (max-width: 600px)': {
                  width: '100%',
                  padding: '10px 0',
                },
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
