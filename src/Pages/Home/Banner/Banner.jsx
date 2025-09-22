import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1 from '../../../assets/banner/banner1.png';
import Banner2 from '../../../assets/banner/banner2.png';
import Banner3 from '../../../assets/banner/banner3.png';
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    return (
        <Carousel className='mt-10' showThumbs={false} autoPlay infiniteLoop>
            <div>
                <img src={Banner1} />
                
            </div>
            <div>
                <img src={Banner2} />
                
            </div>
            <div>
                <img src={Banner3} />
                
            </div>
        </Carousel>
    );
};

export default Banner;