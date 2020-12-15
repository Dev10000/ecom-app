import React from 'react';
import CartIcon from './cart';
import Locals from './locals';
import Checkout from './checkout';
import Modals from '../../../../modals';
import ThemeToggle from './theme-toggle';

const Header: React.FC = (): JSX.Element => {
    return (
        <div className="bg-white dark:bg-gray-800 fixed w-full z-50 shadow bg-opacity-100">
            <div className="mx-10">
                <nav className="hidden md:flex items-center justify-between py-6">
                    <div>
                        <Locals />
                    </div>
                    <div className="flex space-x-10">
                        <Modals />
                        <CartIcon />
                        <Checkout />
                        <ThemeToggle />
                        {/* Search button */}
                        <button type="button">
                            <svg
                                className="w-6 h-6 hover:text-blue-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
