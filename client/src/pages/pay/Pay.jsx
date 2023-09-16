import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../../components/checkOutForm/CheckoutForm';
import newRequest from '../../utils/newRequest';
// import './pay.module.css';
import './pay.scss';

const stripePromise = loadStripe(
  'pk_test_51NqwyASCoFvFCE0lz6NbO8AE752KTggHEGAJxVZOue96m1UqAcadbhSVSW4DRZBbGTO09mud3ttE95i0nPNd7iZ400mYWHdQ0N',
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`,
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
