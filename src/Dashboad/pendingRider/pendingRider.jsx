import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PendingRider = () => {
    const axiosSecure = useAxiosSecure();
    const { data: riders = [] ,refetch} = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending');
            return res.data;
        }
    });
    const handleApprove = async (riderId, action) => {
        try {
            const res = await axiosSecure.patch(`/riders/${riderId}`, { status: action });
            if (res.data.modifiedCount) {
                Swal.fire({
                    
                    icon: 'success',
                    title: `Rider ${action}d successfully.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            } 
            else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `Failed to ${action} rider.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `Error: ${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Apply Date</th>
                        <th className="px-4 py-2">Region</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {riders?.map((rider, index) => (
                        <tr
                            key={index}
                            className="border-b hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-4 py-2">{rider.name}</td>
                            <td className="px-4 py-2">{rider.applyDate}</td>
                            <td className="px-4 py-2">{rider.region}</td>
                            <td className="px-4 py-2">
                                <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                                    {rider.status}
                                </span>
                            </td>
                            <td className="px-4 py-2 flex space-x-2">
                                <button onClick={() => handleApprove(rider._id, "approved")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                                    Approve
                                </button>
                                <button onClick={() => handleApprove(rider._id, "reject")} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {riders?.length === 0 && (
                <div className="text-center text-gray-500 mt-4">
                    No pending riders found.
                </div>
            )}
        </div>
    );
};

export default PendingRider;
