import React from 'react';
import { NavLink } from 'react-router-dom';

const TopMenu: React.FC = (): JSX.Element => {
    const categoryId: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className="mx-10 mt-6">
            <nav className="flex justify-between items-center text-base font-medium">
                <div>
                    <NavLink to="/">LOGO</NavLink>
                </div>
                <div className="flex space-x-10">
                    <div>
                        <NavLink className="text-gray-800 hover:text-blue-500" to="/">
                            HOME
                        </NavLink>
                    </div>
                    <div className="flex">
                        <NavLink className="text-gray-800 hover:text-blue-500" to="/categories">
                            <p>CATEGORIES</p>
                        </NavLink>
                        <div className="dropdown right inline-block">
                            <button type="button">
                                <svg
                                    className="w-4 h-4 hover:text-blue-500 focus:outline-none"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeWidth="2" />
                                </svg>
                            </button>
                            <div className="dropdown-menu absolute right-0 mr-20 hidden text-gray-700 pt-4">
                                <div className="grid grid-cols-3 border shadow border-gray-400">
                                    {categoryId.map((category) => (
                                        <NavLink
                                            key={category}
                                            className="hover:text-blue-500 bg-gray-100 py-2 px-4 block whitespace-no-wrap"
                                            to="/category/1"
                                        >
                                            Category {category}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
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
