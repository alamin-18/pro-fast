import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router';
const ProFastLogo = ({className}) => {
    return (
        <Link to='/' >
        <div className='flex items-center'>
            <img className='mb-3' src={logo} alt="" />
            <p className={className}>ProFast</p>
        </div>
        </Link>
    );
};

export default ProFastLogo;