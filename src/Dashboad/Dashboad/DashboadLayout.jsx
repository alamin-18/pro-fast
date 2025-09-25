import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { FaBars, FaHome, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import { FaAccusoft } from 'react-icons/fa6';

const DashboadLayout = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`${open ? "w-64" : "w-16"
                    } bg-white shadow-md transition-all duration-300 flex flex-col`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    {open && <h1 className="text-xl font-bold">RiderDash</h1>}
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-gray-600 focus:outline-none"
                    >
                        <FaBars size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200"
                    >
                        <FaHome size={20} />
                        {open && <span>Dashboard</span>}
                    </Link>

                    <Link
                        to="pending-rider"
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200"
                    >
                        <FaUsers size={20} />
                        {open && <span>Pending Riders</span>}
                    </Link>
                    <Link
                        to="active-rider"
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200"
                    >
                        <FaUsers size={20} />
                        {open && <span>Active Riders</span>}
                    </Link>
                    <Link
                        to="make-admin"
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200"
                    >
                        <FaAccusoft size={20} />
                        {open && <span>Make Admin</span>}
                    </Link>


                    <Link
                        to="settings"
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200"
                    >
                        <FaCog size={20} />
                        {open && <span>Settings</span>}
                    </Link>
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t">
                    <button className="flex items-center space-x-3 w-full p-2 rounded-md hover:bg-red-100 text-red-600">
                        <FaSignOutAlt size={20} />
                        {open && <span>Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <span className="font-medium">Admin</span>
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="avatar"
                            className="w-10 h-10 rounded-full border"
                        />
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-auto p-4">
                    <Outlet />

                </main>
            </div>
        </div>
    );
};

export default DashboadLayout;