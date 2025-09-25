import React from 'react';
import useAuth from '../../hooks/useAuth';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const Profiles = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data ,refetch} = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`)
            return res.data
        }
    })
    console.log(data);
    const navigate = useNavigate()
    // deleted parcel
    const handlePayment = (id) =>{
        navigate(`/payments/${id}`)
    }
    const handleDelete = async (parcelId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                   
                    axiosSecure.delete(`/parcels/${parcelId}`)
                    .then(res => {
                        if(res.data.deletedCount > 0){
                            Swal.fire("Deleted!", "Parcel has been deleted.", "success");
                        }
                    })
                    refetch()
                } catch (error) {
                    Swal.fire("Error!", "Something went wrong.", "error");
                }
            }
        });
    };

    return (
        <div className='bg-white'>
            <div className=' mx-auto my-10 p-5 border rounded-lg'>
                <h2 className='text-3xl font-bold mb-5'>User Profile</h2>
                <p><strong>Name:</strong> {user?.displayName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <Link to='/profile/payment-history'>
                <button className='bg-[#CAEB66] py-2 px-4 rounded-2xl font-semibold' >View your Payment History</button>
                </Link>
            </div>
            <h2 className='text-3xl font-bold text-center'>Your Parcel</h2>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Parcel Information</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">SL</th>
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Type</th>
                                <th className="px-4 py-2 text-left">Created At</th>
                                <th className="px-4 py-2 text-left">Payment Status</th>
                                <th className="px-4 py-2 text-left">Cost</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((parcel) => (
                                <tr key={parcel._id} className="border-t hover:bg-gray-50">
                                    {/* Type */}
                                    <td className="px-4 py-2 font-medium">
                                        {data.indexOf(parcel) + 1}
                                    </td>
                                    <td className="px-4 py-2 font-medium">
                                        {parcel.title}
                                    </td>
                                    <td className="px-4 py-2 capitalize">
                                        {parcel.type === "document" ? "Document" : "Non-Document"}
                                    </td>


                                    {/* Created At */}
                                    <td className="px-4 py-2">
                                        {new Date(parcel.creation_date).toLocaleDateString()}
                                    </td>


                                    {/* Payment Status with color code */}
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded text-white text-sm font-medium ${parcel.payment_status === "paid"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                                }`}
                                        >
                                            {parcel.payment_status}
                                        </span>
                                    </td>


                                    {/* Cost */}
                                    <td className="px-4 py-2">${parcel.cost}</td>


                                    {/* Actions */}
                                    <td className="px-4 py-2 text-center space-x-2">
                                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                            View Details
                                        </button>
                                        <button onClick={()=>handlePayment(parcel._id)} disabled={parcel.payment_status === "paid"}  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400">
                                            Pay
                                        </button>
                                        <button onClick={() => handleDelete(parcel._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Profiles;