/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = (): JSX.Element => {
    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex flex-col flex-grow bg-gray-300 pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <div className="inline-flex items-center">
                            <svg
                                className="h-8 w-auto"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 44 45"
                            >
                                <rect y=".002" width="44" height="44" rx="16" fill="#40BFFF" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M31.062 20.274a2.444 2.444 0 010 3.457l-7.334 7.333a2.444 2.444 0 01-3.456 0l-7.334-7.333a2.444 2.444 0 010-3.457l7.334-7.333a2.444 2.444 0 013.457 0l7.333 7.333zM22 18.126l-3.876 3.876L22 25.88l3.876-3.877L22 18.126z"
                                    fill="#fff"
                                />
                            </svg>
                            <div className="ml-2 font-bold select-none">E-Shop</div>
                        </div>
                    </div>
                    <nav
                        className="mt-5 flex-1 flex flex-col divide-y divide-blue-800 overflow-y-auto"
                        aria-label="Sidebar"
                    >
                        <div className="px-2 space-y-1 text-blue-900">
                            <NavLink
                                exact
                                to="/admin"
                                activeClassName="text-white bg-blue-500"
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-400"
                            >
                                {/* Heroicon name: home */}
                                <svg
                                    className="mr-4 h-6 w-6"
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
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Dashboard
                            </NavLink>
                            <NavLink
                                activeClassName="text-white bg-blue-500"
                                to="/admin/news"
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-400"
                            >
                                {/* Heroicon name: shopping-bag */}
                                <svg
                                    className="mr-4 h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                    />
                                </svg>
                                News
                            </NavLink>
                            <NavLink
                                activeClassName="text-white bg-blue-500"
                                to="/admin/users"
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-400"
                            >
                                {/* Heroicon name: users */}
                                <svg
                                    className="mr-4 h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                Users
                            </NavLink>
                            <NavLink
                                activeClassName="text-white bg-blue-500"
                                to="/admin/products"
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-400"
                            >
                                {/* Heroicon name: shopping-bag */}
                                <svg
                                    className="mr-4 h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                Products
                            </NavLink>
                            <NavLink
                                activeClassName="text-white bg-blue-500"
                                to="/admin/categories"
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-400"
                            >
                                {/* Heroicon name: shopping-bag */}
                                <svg
                                    className="mr-4 h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                                Product Categories
                            </NavLink>
                            <NavLink
                                activeClassName="text-white bg-blue-500"
                                to="/admin/countries"
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-400"
                            >
                                {/* Heroicon name: shopping-bag */}
                                <svg
                                    className="mr-4 h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                    />
                                </svg>
                                Countries
                            </NavLink>
                            <NavLink
                                activeClassName="text-white bg-blue-500"
                                to="/admin/orders"
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-400"
                            >
                                {/* Heroicon name: shopping-cart */}
                                <svg
                                    className="mr-4 h-6 w-6"
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
                                Orders
                            </NavLink>
                            <NavLink
                                activeClassName="text-white bg-blue-500"
                                to="/admin/reports"
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-400"
                            >
                                {/* Heroicon name: reports */}
                                <svg
                                    className="mr-4 h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                    />
                                </svg>
                                Reports
                            </NavLink>
                        </div>
                        <div className="mt-6 pt-6">
                            <div className="px-2 space-y-1 text-blue-900">
                                <NavLink
                                    activeClassName="text-white bg-blue-500"
                                    to="/admin/settings"
                                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-400"
                                >
                                    {/* Heroicon name: cog */}
                                    <svg
                                        className="mr-4 h-6 w-6"
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
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    Settings
                                </NavLink>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
