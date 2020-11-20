/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../../context/auth';

const Navbar: React.FC = (): JSX.Element => {
    const { user } = useContext(AuthContext);

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        <div className="flex-1 overflow-auto focus:outline-none" tabIndex={0}>
            <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
                <button
                    type="button"
                    className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 lg:hidden"
                >
                    {/* Heroicon name: menu-alt-1 */}
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </button>
                {/* Search bar */}
                <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                    <div className="flex-1 flex">
                        <form className="w-full flex md:ml-0" action="#" method="GET">
                            <label htmlFor="search_field" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                <div
                                    className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                                    aria-hidden="true"
                                >
                                    {/* Heroicon name: search */}
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="search_field"
                                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                                    placeholder="Type search terms and press Enter"
                                    type="search"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="ml-4 flex items-center md:ml-6">
                        <button
                            type="button"
                            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        >
                            {/* Heroicon name: bell */}
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </button>
                        {/* Profile dropdown */}
                        <div className="ml-3 relative">
                            <div>
                                <button
                                    type="button"
                                    className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                                    id="user-menu"
                                    aria-haspopup="true"
                                >
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://via.placeholder.com/32"
                                        alt="Profile"
                                    />
                                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                        {`${user?.first_name} ${user?.last_name}`}
                                    </span>
                                    {/* Heroicon name: chevron-down */}
                                    <svg
                                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
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
                            </div>
                            <div
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu"
                            >
                                <NavLink
                                    to="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    Account
                                </NavLink>
                                <NavLink
                                    to="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    Logout
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
