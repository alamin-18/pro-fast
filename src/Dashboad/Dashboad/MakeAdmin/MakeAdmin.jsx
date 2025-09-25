import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MakeAdmin = () => {
    const [query, setQuery] = useState("");
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();
    // Fetch users
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", query],
        queryFn: async () => {
            if (!query) return [];
            const res = await axiosSecure.get(`/users/search?email=${query}`);
            return res.data;
        },
        enabled: false, // only run when search clicked
    });

    // Mutation: update role
    const updateRoleMutation = useMutation({
        mutationFn: async ({ id, role }) => {
            console.log(id, role);
            return axiosSecure.patch(`/users/${id}/role`, { role });
        },
        onSuccess: (_, { role }) => {
            queryClient.invalidateQueries(["users", query]);
            Swal.fire({
                icon: "success",
                title: `User role updated to "${role}" successfully!`,
                showConfirmButton: false,
                timer: 1500,
            });
            refetch();
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Failed to update role",
                text: error.message,
            });
        },
    });

    const handleSearch = () => {
        refetch();
    };

    const handleRoleChange = (id, newRole) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You are about to set role to "${newRole}".`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, update!`,
        }).then((result) => {
            if (result.isConfirmed) {
                updateRoleMutation.mutate({ id, role: newRole });
            }
        });
    };
   

    

    return (
        <div className="p-6">
            {/* Search Bar */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Created At</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-4">{user.name || "N/A"}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">{user.role || "N/A"}</td>
                                    <td className="py-3 px-4">
                                        {user.createdAt
                                            ? new Date(user.createdAt).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                    <td className="py-3 px-4 flex gap-2">
                                        <button
                                            onClick={() => handleRoleChange(user._id, "admin")}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            disabled={updateRoleMutation.isLoading}
                                        >
                                            Make Admin
                                        </button>

                                        <button
                                            onClick={() => handleRoleChange(user._id, "user")}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            disabled={updateRoleMutation.isLoading}
                                        >
                                            Remove Admin
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;