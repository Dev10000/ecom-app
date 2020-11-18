import React, { useContext, useState } from 'react';
import CartContext from '../../../context/cart';
import { formatCurrency } from '../../../utils';

type IProductProps = IProduct;

const Product: React.FC<IProductProps> = (props: IProduct): JSX.Element => {
    const { id, title, price, discount } = props;
    const [visibleButtons, setVisibleButtons] = useState(false);
    const { addProduct } = useContext(CartContext);

    return (
        <div
            key={id}
            onMouseEnter={() => setVisibleButtons(true)}
            onMouseLeave={() => setVisibleButtons(false)}
            className="max-w-2xl bg-gray-300 rounded-md flex flex-col"
        >
            <div className="flex items-center text-center mx-auto h-40">
                <img src="https://via.placeholder.com/250x150?text=Product Image" alt="Lorem ipsum" />
                <div
                    className={`${
                        visibleButtons ? 'block' : 'hidden'
                    } absolute w-48 h-32 bg-white rounded shadow bg-opacity-75 transform translate-x-6`}
                >
                    <div className="flex w-full h-full items-center">
                        <button
                            type="button"
                            onClick={() => addProduct(props)}
                            className="mx-auto rounded-full p-6 border-2 border-gray-200 cursor-pointer bg-white bg-opacity-75 hover:bg-opacity-100 hover:shadow-2xl select-none transition ease-in-out duration-150 focus:outline-none"
                        >
                            <svg
                                className="w-8 h-8 text-blue-400"
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
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white m-1 flex flex-1 flex-col">
                <div className="text-center text-lg text-blue-900 font-extrabold py-2 flex-1">{title}</div>
                <div className="text-center py-2 text-sm">Rating here</div>
                <div className="text-center py-2 space-x-2 flex-end">
                    <span className="font-extrabold text-blue-400">
                        {formatCurrency(price * ((100 - discount) / 100))}
                    </span>
                    <span className="text-gray-700 line-through">{formatCurrency(price)}</span>
                    <span className="font-bold text-red-500">{discount}% Off</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
