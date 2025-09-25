import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const PaymentsHistory = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: payment, isPending } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })
    console.log(payment);
    if (isPending) {
        return <progress className="progress w-56"></progress>
    }
    return (
        <div className='p-10 bg-white min-h-screen'>
            <h1 className='text-4xl font-bold my-10'>Payment History</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left text-gray-700">Parcel Name</th>
                            <th className="py-2 px-4 text-left text-gray-700">Created At</th>
                            <th className="py-2 px-4 text-left text-gray-700">Transaction ID</th>
                            <th className="py-2 px-4 text-left text-gray-700">Cost ($)</th>
                            <th className="py-2 px-4 text-left text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payment.map((pay) => (
                            <tr
                                key={pay.parcelId}
                                className="border-t border-gray-200 hover:bg-gray-50"
                            >
                                <td className="py-2 px-4">{pay.parcelName}</td>
                                <td className="py-2 px-4">
                                    {new Date(pay.createdAt).toLocaleString()}
                                </td>
                                <td className="py-2 px-4">{pay.transactionId || "N/A"}</td>
                                <td className="py-2 px-4">{pay.price}</td>
                                <td className="py-2 px-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-white text-sm ${pay.status === "paid"
                                                ? "bg-green-500"
                                                : "bg-yellow-500"
                                            }`}
                                    >
                                        {pay.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsHistory;