import React from 'react';
import ProFastLogo from '../Pages/Shared/ProFastLogo/ProFastLogo';
import authimage from '../assets/authimage.png';
import { Outlet } from 'react-router';
const AuthLayout = () => {
    return (
        <div >
           <ProFastLogo className={'text-2xl -ml-4 font-extrabold'}/>
           <div className='flex'>
            <div className='flex-1'>

                <Outlet/>
            </div>
            <div className='flex-1 bg-[#fafdf0]'>
                <img src={authimage} alt="" />
            </div>
            </div> 
        </div>
    );
};

export default AuthLayout;