import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto urbanist-font bg-[#eaeced]'>
            <Navbar/>
            <Outlet />
            <Footer/>
        </div>
    );
};

export default MainLayout;