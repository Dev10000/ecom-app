import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CategoriesDropdown from './CategoriesDropdown';

const TopMenu: React.FC = (): JSX.Element => {
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
                        <svg width="39" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y=".027" width="39" height="39" rx="16" fill="#40BFFF" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M27.532 17.995a2.167 2.167 0 010 3.064l-6.5 6.5a2.167 2.167 0 01-3.064 0l-6.5-6.5a2.167 2.167 0 010-3.064l6.5-6.5a2.167 2.167 0 013.064 0l6.5 6.5zM19.5 16.09l-3.436 3.436 3.436 3.436 3.436-3.436L19.5 16.09z"
                                fill="#fff"
                            />
                        </svg>
                        <div className="text-base mx-2 font-medium">E-Shop</div>
                    </NavLink>
                </div>
                <div className="flex space-x-10">
                    <div>
                        <NavLink className="text-gray-800 hover:text-blue-500" to="/">
                            HOME
                        </NavLink>
                    </div>
                    <div onMouseLeave={closeDisplay}>
                        <button type="button" className="flex" onMouseEnter={openDisplay} onClick={closeDisplay}>
                            <NavLink
                                className="relative flex items-center text-gray-800 hover:text-blue-500"
                                to="/categories"
                            >
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
                        </button>
                        {display ? (
                            <div
                                onMouseLeave={closeDisplay}
                                className="container absolute w-3/4 inset-x-0 mx-40 border rounded shadow"
                            >
                                <CategoriesDropdown action={closeDisplay} />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                    <div>
                        <NavLink className="text-gray-800 hover:text-blue-500" to="/contact">
                            CONTACT US
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default TopMenu;
