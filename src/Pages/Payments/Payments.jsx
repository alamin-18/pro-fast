import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentsForm from './PaymentsForm';

const Payments = () => {
    const stripePromis = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    return (
        <Elements stripe={stripePromis}>
            <PaymentsForm/>
        </Elements>
    );
};

export default Payments;