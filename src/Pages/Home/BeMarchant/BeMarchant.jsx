import React from 'react';
import location from '../../../assets/location-merchant.png'

const BeMarchant = () => {
    return (
        <div data-aos="zoom-in-up" className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] my-20 rounded-4xl p-20">
            <div className=" flex">
                
                <div>
                    <h1 className="text-5xl text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="bg-[#CAEB66] py-2 px-2 font-bold text-black rounded-full">Become A Merchant</button>
                    <button className="hover:bg-[#CAEB66] border-1 py-2 px-2 font-bold border-[#CAEB66] text-white ms-4 rounded-full">Become A Merchant</button>
                </div>
                <img
                    src={location}
                    className="max-w-sm rounded-lg "
                />
            </div>
        </div>
    );
};

export default BeMarchant;