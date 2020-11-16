import React from 'react';

const Hero: React.FC = (): JSX.Element => {
    return (
        <div className="w-screen mt-8">
            <img className="w-full h-96 object-cover" src="/assets/thumbnails/hero1.png" alt="shoes" />
        </div>
    );
};

export default Hero;
