import { getAccessPayment } from '@/services/PaymentService';
import { PaymentInterface } from '@/utils/interfaces/Payment';
import { Box, LinearProgress, Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import PaymentField from './PaymentField';
import { useRouter } from 'next/navigation';
import { CURRENCY_PROMOTION, DOMAIN, PRICE_PROMOTION } from '@/utils/constans';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

interface PaymentFormProps {
  callBackFunction: () => Promise<boolean>;
  linkToRedirect: string;
}

const PaymentForm = ({
  callBackFunction,
  linkToRedirect,
}: PaymentFormProps) => {
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const options = {
    clientSecret: secretKey,
  };

  useEffect(() => {
    console.log('PaymentFormProps', linkToRedirect);
    console.log('current url', window.location.href.replace(DOMAIN, ''));
    const paymentOpion: PaymentInterface = {
      amount: PRICE_PROMOTION,
      currency: CURRENCY_PROMOTION,
    };
    getAccessPayment(paymentOpion)
      .then((clientSecret) => {
        if (clientSecret) {
          setSecretKey(clientSecret);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePayment = async (): Promise<boolean> => {
    let attempts = 0;
    let response = false;

    while (attempts < 3) {
      response = await callBackFunction();
      console.log('response operation :: ', response);
      if (response) {
        const currentUrl = window.location.href.replace(DOMAIN, '');
        if (linkToRedirect === currentUrl) {
          window.location.reload();
        } else {
          router.push(linkToRedirect);
        }
        return true;
      }
      attempts++;
    }

    return false;
  };

  return loading ? (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <Typography color="primary" variant="body">
          Loading the checkout
        </Typography>
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress />
        </Box>
      </Box>
    </Box>
  ) : (
    <Elements stripe={stripePromise} options={options}>
      <PaymentField callBackFunction={handlePayment} />
    </Elements>
  );
};

export default PaymentForm;
