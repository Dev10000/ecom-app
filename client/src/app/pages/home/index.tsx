import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './hero';
import Product from '../../../ui/components/product';

const Home: React.FC = (): JSX.Element => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        axios
            .get(`products`)
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, []);
    return (
        <>
            <Hero />
            <div className="grid lg:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 px-10">
                {products.map((product) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Product key={product.id} {...product} />
                ))}
            </div>
        </>
    );
};

export default Home;
