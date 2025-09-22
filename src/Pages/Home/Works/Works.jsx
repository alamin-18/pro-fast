import React from 'react';
import { GrDeliver } from 'react-icons/gr';

const Works = () => {
    return (
        <div className='max-w-6xl mx-auto my-20 '>
            <h2 className='text-2xl font-bold'>How it work</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center mt-8'>
                <div className='bg-white p-10 rounded-lg  my-10'>
                    <span className='text-3xl'><GrDeliver /></span>
                    <h3 className='text-xl font-bold my-3'>Booking Pick & Drop</h3>
                    <p className='text-gray-600'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='bg-white p-10 rounded-lg  my-10'>
                    <span className='text-3xl'><GrDeliver /></span>
                    <h3 className='text-xl font-bold my-3'>Cash On Delivery</h3>
                    <p className='text-gray-600'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='bg-white p-10 rounded-lg  my-10'>
                    <span className='text-3xl'><GrDeliver /></span>
                    <h3 className='text-xl font-bold my-3'>Delivery Hub</h3>
                    <p className='text-gray-600'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='bg-white p-10 rounded-lg  my-10'>
                    <span className='text-3xl'><GrDeliver /></span>
                    <h3 className='text-xl font-bold my-3'>Booking SME & Corporate</h3>
                    <p className='text-gray-600'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
            </div>
        </div>
    );
};

export default Works;