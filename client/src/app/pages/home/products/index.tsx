import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products`)
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    return (
        <div className="flex flex-row gap-0 items-center mx-20">
            {products
                .filter((product, index) => index < 3)
                .map((product) => (
                    <div key={product.id}>
                        <div className="relative">
                            <div className="absolute z-10 hover:z-0">
                                <div>
                                    <p className="absolute text-base z-10 w-full p-2 h-16 bg-opacity-100 text-white">
                                        {product.title}
                                    </p>
                                    <img
                                        className=" border object-cover"
                                        src="../assets/thumbnails/nike_red.jpeg"
                                        alt="Shoes"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative bg-opacity-100 z-0 hover:z-10 mx-40 mt-32 flex flex-row items-center">
                            <button
                                type="button"
                                className="w-10 h-10 border-2 bg-white hover:bg-gray-300 border-blue-400 rounded-full border-gray-400"
                            >
                                <div className="mt-1 ml-2">
                                    <svg width="19" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.822 2.961a3.344 3.344 0 012.5 5.561c-.613.691-5.84 5.584-5.84 5.584s-5.238-4.893-5.85-5.595a3.3 3.3 0 01-.837-2.207 3.344 3.344 0 016.687 0 3.344 3.344 0 013.344-3.344l-.004.001zm.004-2.23a5.543 5.543 0 00-3.344 1.115 5.573 5.573 0 00-7.519 8.141c.626.718 4.75 4.578 6 5.744a2.229 2.229 0 003.045 0c1.244-1.165 5.35-5.015 5.984-5.732a5.573 5.573 0 00-4.17-9.267l.004-.001z"
                                            fill="#33A0FF"
                                        />
                                    </svg>
                                </div>
                            </button>
                            <button
                                type="button"
                                className="ml-2 w-10 h-10 border-2 bg-white hover:bg-gray-300 border-blue-400 rounded-full border-gray-400"
                            >
                                <div className="mt-1 ml-2">
                                    <svg
                                        className="w-5 h-5 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Products;
