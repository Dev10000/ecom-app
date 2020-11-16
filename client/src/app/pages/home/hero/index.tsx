import React from 'react';

const Hero: React.FC = (): JSX.Element => {
    return (
        <div className="w-screen mt-8 border">
            <img className="w-full h-96 object-cover mt-0" src="/assets/thumbnails/nike_blue.jpeg" alt="shoes" />
        </div>
    );
};

export default Hero;
