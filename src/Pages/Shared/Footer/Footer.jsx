import React from 'react';
import { FaLinkedin, FaXTwitter, FaFacebook, FaYoutube } from "react-icons/fa6";
import ProFastLogo from '../ProFastLogo/ProFastLogo';
const Footer = () => {
    return (
         <footer className="bg-black text-gray-300 py-10 rounded-2xl">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* Logo and description */}
        <div className="mb-6">
          <div className='flex justify-center'>
            <ProFastLogo className={'text-2xl -ml-4 font-extrabold text-white'}/>
          </div>
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-base text-gray-400 border-t border-gray-700 pt-6">
          <a href="#" className="hover:text-white">Services</a>
          <a href="#" className="hover:text-white">Coverage</a>
          <a href="#" className="hover:text-white">About Us</a>
          <a href="#" className="hover:text-white">Pricing</a>
          <a href="#" className="hover:text-white">Blog</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mt-6 border-t border-gray-700 pt-6">
          <a href="#" className="text-2xl text-gray-400 hover:text-blue-500">
            <FaLinkedin />
          </a>
          <a href="#" className="text-2xl text-gray-400 hover:text-white">
            <FaXTwitter />
          </a>
          <a href="#" className="text-2xl text-gray-400 hover:text-blue-600">
            <FaFacebook />
          </a>
          <a href="#" className="text-2xl text-gray-400 hover:text-red-500">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
    );
};

export default Footer;