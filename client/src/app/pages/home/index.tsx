import React from 'react';
import Hero from './hero';
import Categories from './categories';
import Products from './products';

const Home: React.FC = (): JSX.Element => {
    return (
        <div className="flex flex-col items-center">
            <div>
                <Hero />
            </div>
            <div className="-mt-16">
                <Products />
            </div>
            <div>
                <Categories />
            </div>
        </div>
    );
};

export default Home;
