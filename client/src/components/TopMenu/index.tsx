import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CategoriesDropdown from './CategoriesDropdown';

const TopMenu: React.FC = (): JSX.Element => {
    // const categoryId: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [display, setDisplay] = useState<boolean>(false);
    const openDisplay = () => {
        setDisplay(true);
    };
    const closeDisplay = () => {
        setDisplay(false);
    };
    return (
        <div className="mx-10 mt-6">
            <nav className="flex justify-between items-center text-base font-medium">
                <div>
                    <NavLink className="flex items-center" to="/">
                        <div className="h-8 w-8 border shadow rounded-lg p-2 bg-blue-500">
                            <div className="relative h-4 w-4 bg-white transform rotate-45">
                                <div className="absolute h-2 w-2 ml-1 mt-1 bg-blue-500" />
                            </div>
                        </div>
                        <div className="m-1">E-Shop</div>
                    </NavLink>
                </div>
                <div className="flex space-x-10">
                    <div>
                        <NavLink className="text-gray-800 hover:text-blue-500" to="/">
                            HOME
                        </NavLink>
                    </div>
                    <div className="flex" onMouseEnter={openDisplay}>
                        <NavLink className="flex items-center text-gray-800 hover:text-blue-500" to="/categories">
                            <p>CATEGORIES</p>
                            <svg
                                className="w-4 h-4 hover:text-blue-500 focus:outline-none"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeWidth="2" />
                            </svg>
                        </NavLink>
                    </div>

                    <div>
                        <NavLink className="text-gray-800 hover:text-blue-500" to="/contact">
                            CONTACT US
                        </NavLink>
                    </div>
                </div>
            </nav>
            <div className="container absolute">
                {display ? (
                    <div onMouseLeave={closeDisplay} className="border rounded shadow mx-24">
                        <CategoriesDropdown />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default TopMenu;
