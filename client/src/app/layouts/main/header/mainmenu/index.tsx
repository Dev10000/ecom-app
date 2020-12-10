import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CategoriesDropdown from './CategoriesDropdown';

const TopMenu: React.FC = (): JSX.Element => {
    const [display, setDisplay] = useState<boolean>(false);

    return (
        <div className="mx-10 mb-6">
            <div className="-mr-2 -my-2 md:hidden">
                <button
                    type="button"
                    className="mt-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-white hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            <nav className="hidden md:flex justify-between items-center text-base font-medium">
                <div className="mt-24">
                    <NavLink className="flex items-center" to="/">
                        <svg className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 45">
                            <rect y=".002" width="44" height="44" rx="16" fill="#40BFFF" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M31.062 20.274a2.444 2.444 0 010 3.457l-7.334 7.333a2.444 2.444 0 01-3.456 0l-7.334-7.333a2.444 2.444 0 010-3.457l7.334-7.333a2.444 2.444 0 013.457 0l7.333 7.333zM22 18.126l-3.876 3.876L22 25.88l3.876-3.877L22 18.126z"
                                fill="#fff"
                            />
                        </svg>
                        <div className="ml-2 font-bold">E-Shop</div>
                    </NavLink>
                </div>
                <div className="flex space-x-6 mt-24">
                    <div>
                        <NavLink
                            exact
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-gray-100 hover:text-blue-400 dark:hover:text-blue-400 uppercase focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-500 transition duration-150 ease-in-out"
                            to="/"
                        >
                            Home
                        </NavLink>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="group inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-gray-100 hover:text-blue-400 dark:hover:text-blue-400 uppercase focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-500 transition duration-150 ease-in-out"
                            onClick={() => setDisplay(!display)}
                        >
                            <span className="font-medium mr-1">Categories</span>
                            <svg
                                className="ml-2 h-5 w-5 text-gray-800 group-hover:text-blue-400 transition ease-in-out duration-150"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {display ? (
                            <div className="container">
                                <CategoriesDropdown setDisplay={setDisplay} />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                    <div>
                        <NavLink
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-gray-100 hover:text-blue-400 dark:hover:text-blue-400 uppercase focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-500 transition duration-150 ease-in-out"
                            to="/contact"
                        >
                            Contact us
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default TopMenu;
