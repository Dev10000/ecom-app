import React from 'react';
import HeroImg from './hero1.png';

const Hero: React.FC = (): JSX.Element => {
    return (
        <div className="w-screen mt-8">
            <img className="w-full h-72 object-cover" src={HeroImg} alt="shoes" />
        </div>
    );
};

export default Hero;
