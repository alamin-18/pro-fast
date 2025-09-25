import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ActiveRider = () => {
    const axiosSecure = useAxiosSecure();
    const { data: riders = [],refetch } = useQuery({
        queryKey: ['active-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/approved');
            return res.data;
        }
    });
     const handleAction = async (riderId, action) => {
    try {
      const res = await axiosSecure.patch(`/riders/suspend/${riderId}`, { status: action });

      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: `Rider ${action}d successfully.`,
          showConfirmButton: false,
          timer: 1500
        });
         // Refresh table
         refetch();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Failed to ${action} rider.`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Error: ${error.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
    return (
        <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Active Riders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Approve Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No active riders found
                </td>
              </tr>
            ) : (
              riders.map((rider) => (
                <tr key={rider.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{rider.name}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        rider.status === "approved" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(rider.approveDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button
                      onClick={() => handleAction(rider._id, "suspend")}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => handleAction(rider._id, "remove")}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ActiveRider;