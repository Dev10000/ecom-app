import React from 'react';
import HeroImg2 from './hero2.png';

const Hero2: React.FC = (): JSX.Element => {
    return (
        <div className="flex max-w-screen mt-8 bg-blue-400 h-64">
            <div className="flex flex-row justify-between w-full text-xs p-16">
                <div className="flex flex-col w-48 sm:w-96 md:w-96">
                    <h2 className="text-white text-2xl font-bold -mt-6">
                        Addidas Men running <br /> Sneakers
                        <br />
                    </h2>

                    <span className="text-white mt-1 py-2 text-sm">
                        Performancew and design.Taken right to the edge
                    </span>
                    <span className="text-white text-sm py-3 underline">Show now</span>
                </div>

                <div className="flex flex-col w-48 sm:w-96 md:w-96 relative">
                    <img className="w-full h-60 absolute -mt-24" src={HeroImg2} alt="shoe" />
                </div>
            </div>
        </div>
    );
};

export default Hero2;
