import React from 'react';
import Marquee from "react-fast-marquee";
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import start from '../../../assets/brands/start.png'
import startpeople1 from '../../../assets/brands/start-people 1.png'
const Team = () => {
    const teams = [amazon, amazon_vector, casio, moonstar, randstad, start, startpeople1]
    return (
        <div className='my-20'>
            <h1 className='text-2xl font-bold text-center'>We've helped thousands of sales teams</h1>

            <Marquee pauseOnHover speed={50} gradient={false} className='mt-10'>
                {teams.map((logo, idx) => (
                    <div key={idx} className="mx-8 flex items-center">
                        <img src={logo} alt={`Client Logo ${idx + 1}`} className="h-6 object-contain" />
                    </div>
                ))}
            </Marquee>
                <p className='text-center mt-20'>--------------------------------------------------------------------------------------------------</p>
        </div>
    );
};

export default Team;