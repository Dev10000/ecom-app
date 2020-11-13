import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Hero from './hero';

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
        <div className="grid gap-4 grid-cols-4 px-10">
            {products.map((product) => (
                <div key={product.id} className="max-w-2xl bg-gray-300 rounded-md flex flex-col">
                    <div className="flex items-center h-40 ">
                        <span className="w-full text-center">Image here</span>
                    </div>
                    <div className="bg-white m-1 flex flex-1 flex-col">
                        <div className="text-center text-lg text-blue-900 font-extrabold py-2 flex-1">
                            {product.title}
                        </div>
                        <div className="text-center py-2 text-sm">Rating here</div>
                        <div className="text-center py-2 space-x-2 flex-end">
                            <span className="font-extrabold text-blue-400">$299,43</span>
                            <span className="text-gray-700 line-through">$534,33</span>
                            <span className="font-bold text-red-500">24% Off</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
