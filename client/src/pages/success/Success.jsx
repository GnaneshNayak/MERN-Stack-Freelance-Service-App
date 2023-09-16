import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
const Success = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent');

  console.log(payment_intent);
  const navigate = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      await newRequest
        .put('/orders', { payment_intent })
        .then((res) => navigate('/orders'))
        .catch((err) => console.log(err));
    };
    makeRequest();
  }, []);

  return (
    <div>
      payment successful. You are redirected to thr orders page. Please do not
      close the page
    </div>
  );
};

export default Success;
