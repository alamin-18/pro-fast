// src/components/Navbar.jsx
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // heroicons from react-icons
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const {user,logOut} = useAuth()
    const handelLogOut = ()=>{
        logOut()
        .then(()=>{})
        .catch(error=>{
            console.log(error);
        })
    }
    const NavbarMenu = <>

        <Link  className="text-gray-600 hover:text-lime-500">Services</Link>
        <Link to='coverage' className="text-gray-600 hover:text-lime-500">Coverage</Link>
        <Link  className="text-gray-600 hover:text-lime-500">About Us</Link>
        <Link to='/add-parcel' className="text-gray-600 Link hover:text-lime-500">Add Parcel</Link>
        <Link to='profile' className="text-gray-600 hover:text-lime-500">Profile</Link>
    </>;
    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Logo */}

                <ProFastLogo className={'text-2xl -ml-4 font-extrabold'} />

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {NavbarMenu}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    {
                        user ? <button onClick={handelLogOut} className="font-bold">Logout</button>:<Link to='/login'>
                    <button className="border border-gray-300 px-4 py-1 rounded-lg hover:bg-gray-100">
                        Sign In
                    </button>
                    </Link>
                    }
                    <Link to='/become-a-rider'>
                     <button className="bg-lime-400 px-4 py-1 rounded-lg font-semibold hover:bg-lime-500">
                        Be a rider
                    </button>
                    </Link>

                    <button className="bg-black text-white p-2 rounded-full ">
                        <span className="text-lime-400">↗</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-gray-700"
                >
                    {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    {NavbarMenu}
                    <div className="space-y-2">
                        <button className="w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
                            Sign In
                        </button>
                        <button className="w-full bg-lime-400 px-4 py-2 rounded-lg font-semibold hover:bg-lime-500">
                            Be a rider
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
