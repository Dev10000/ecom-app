import React, { useState } from 'react';

type IProductProps = IProduct;

const Products: React.FC<IProductProps> = (props: IProduct) => {
    const [display, setDisplay] = useState<boolean>(false);
    const { id, title, price, discount } = props;
    const openDisplay = () => {
        setDisplay(true);
    };
    const closeDisplay = () => {
        setDisplay(false);
    };

    return (
        <div key={id} className="text-center" onMouseEnter={openDisplay} onMouseLeave={closeDisplay}>
            <div className="">
                {display ? (
                    <div className="absolute bg-opacity-100 p-2 z-0 hover:z-10 flex flex-row content-center">
                        <button
                            type="button"
                            className="w-10 h-10 border-2 bg-white hover:border-blue-600 hover:bg-gray-300 border-blue-400 rounded-full border-gray-400"
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
                            className="ml-2 w-10 h-10 border-2 bg-white hover:bg-gray-300 border-blue-400 hover:border-blue-600 rounded-full border-gray-400"
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
                ) : (
                    ''
                )}
                <div className=" z-10 hover:z-0">
                    <img className=" border object-cover" src="../assets/thumbnails/nike_red.jpeg" alt="Shoes" />

                    <div className="p-2 border border-gray-500">
                        <div className="text-base text-center font-extrabold h-12 w-full bg-opacity-100 text-gray-700">
                            {title}
                        </div>
                        <div className="text-sm text-center mt-2">Rating here</div>
                        <div className="mt-2">
                            <span className="text-sm font-extrabold text-red-700 mx-2">
                                €{(price * (1 - discount * 0.01)).toFixed(2)}
                            </span>

                            <span className="text-sm text-base font-extrabold text-blue-500 line-through mx-2">
                                {price}
                            </span>
                            <span className="text-sm text-base font-extrabold mx-2 text-red-700">{discount}% Off</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
