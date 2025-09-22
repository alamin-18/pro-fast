import React from 'react';
import Banner from '../Banner/Banner';
import Works from '../Works/Works';
import Services from '../Services/Services';
import Team from '../Team/Team';
import Benifitclint from '../Benifitclint/Benifitclint';
import BeMarchant from '../BeMarchant/BeMarchant';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Works/>
            <Services/>
            <Team/>
            <Benifitclint/>
            <BeMarchant/>
        </div>
    );
};

export default Home;