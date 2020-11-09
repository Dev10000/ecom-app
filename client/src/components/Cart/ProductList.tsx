import React, { useState } from 'react';
import Quantity from './Quantity';

const ProductList: React.FC = (): JSX.Element => {
    interface IProduct {
        id: number;
        imageUrl: string;
        description: string;
        price: number;
    }
    const product1 = { id: 100, imageUrl: '/assets/thumbnails/nike_blue.jpeg', description: 'Nike blue', price: 100 };
    const product2 = { id: 101, imageUrl: '/assets/thumbnails/nike_red.jpeg', description: 'Nike red', price: 120 };
    const product3 = { id: 102, imageUrl: '/assets/thumbnails/coat.jpeg', description: 'Black coat', price: 200 };

    const [itemsCart, setItemsCart] = useState<IProduct[]>([product1, product2, product3]);

    const deleteItem = (index: number) => {
        const del = itemsCart[index];
        setItemsCart(itemsCart.filter((product) => product !== del));
    };

    return (
        <div>
            {itemsCart.map((product, index) => (
                <div className="flex justify-between text-base p-4 border-b border-gray-200 mx-10">
                    <div className="flex items-center space-x-10">
                        <button type="button" onClick={() => deleteItem(index)}>
                            <svg
                                className="w-4 h-4 fill-current text-red-600 inline-block"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" />
                            </svg>
                        </button>

                        <span>
                            <img
                                className="object-cover w-32 h-24 border rounded"
                                src={product.imageUrl}
                                alt="Nike shoes"
                            />
                        </span>
                        <span>{product.description}</span>
                    </div>
                    <div className="flex items-center space-x-20">
                        <span className="">{product.price}</span>
                        <span>
                            <Quantity />
                        </span>
                        <span>{product.price}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
