import { CardElement } from '@stripe/react-stripe-js';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentsForm = () => {
    const { id } = useParams()
    const [error, setError] = useState('');
    const stripe = useStripe();
    const element = useElements();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: parcelInfo, } = useQuery({
        queryKey: ['payment', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`)
            return res.data
        }
    })
    const price = parcelInfo?.cost;
    const amount = price * 100;
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !element) {
            return
        }
        const card = element.getElement(CardElement);
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            setError(error);
        } else {
            setError('');
            // console.log('payment method', paymentMethod);
            // process payment
            const res = await axiosSecure.post('/create-payment-intent', { amount: amount });
            console.log('payment intent', res);
            const clientSecret = res.data.clientSecret;
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: element.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'unknown',
                    },
                },
            });
            if (result.error) {
                console.log('payment error', result.error);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // console.log('payment success', result.paymentIntent);
                    // store payment info in the database
                    const payment = {
                        email: user?.email,
                        transactionId: result.paymentIntent.id,
                        price,
                        date: new Date(),
                        parcelId: parcelInfo?._id,
                        status: 'service pending',
                        parcelName: parcelInfo?.title,
                        customerName: user?.displayName
                    }
                    axiosSecure.post('/payments', payment)
                        .then(res => {
                            console.log(res.data);
                            Swal.fire({
                                icon: 'success',
                                title: 'Transaction Successful',
                                text: 'Your payment has been recorded!',
                                confirmButtonText: 'OK'
                            });
                            navigate('/profile')
                        })

                }

            }
        }
    }

    return (
        <div className='my-20'>
            <form action="" className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

                <label className="block mb-2 text-xl font-medium">Card details</label>
                <div className="mb-4 p-3 border rounded-lg">
                    <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                </div>
                {error && <p className="text-red-500 mb-4">{error.message}</p>}
                <button className='bg-[#CAEB66] text-black w-full text-center px-4 py-2 rounded mt-4' type='submit' disabled={!stripe || !element}>
                    Pay ${price}
                </button>
            </form>
        </div>
    );
};

export default PaymentsForm;