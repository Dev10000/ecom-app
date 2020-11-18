import React from 'react';
import HeroImg from './hero1.png';

const Hero: React.FC = (): JSX.Element => {
    return (
        <div className="w-full mt-8 relative">
            <img className="w-full h-72 object-cover" src={HeroImg} alt="shoes" />
            <h1 className="text-white absolute top-1/2  pl-10 z-10 text-4xl font-bold">Super Flash Sale 50% Off</h1>
        </div>
    );
};

export default Hero;
