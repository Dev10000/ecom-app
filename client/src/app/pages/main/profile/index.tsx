/* eslint-disable camelcase */
import React, { useContext } from 'react';
import AuthContext from '../../../../context/auth';

const Profile: React.FC = (): JSX.Element => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <div className="bg-gray-100 h-10 w-full" />
            <div className="mx-10">
                <div className="flex flex-col sm:flex-row sm:mt-10 space-y-10 sm:space-x-10">
                    <div className="flex flex-row sm:flex-col w-full sm:w-1/4 justify-center sm:justify-start sm:space-y-2">
                        <button
                            type="button"
                            className="flex flex-row text-gray-700 hover:bg-blue-400 hover:text-white px-2 py-4 border shadow rounded-md space-x-2"
                        >
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <div>Profile</div>
                        </button>
                        <button
                            type="button"
                            className="flex flex-row space-x-2 text-gray-700 hover:bg-blue-400 hover:text-white px-2 py-4 border shadow rounded-md"
                        >
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            <div>Orders</div>
                        </button>
                    </div>
                    <div className="flex-grow flex flex-col space-y-10 border rounded-md shadow">
                        <div className="mt-5">
                            <div className="flex flex-row justify-center">
                                <div className="w-24 h-24 border-4 rounded-full border-blue-400 text-blue-400">
                                    {' '}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center text-gray-300">
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-center">
                                        <div>{user?.first_name}</div>
                                        <div>{user?.last_name}</div>
                                    </div>
                                    <div>anup@poudel.com</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between border-b border-gray-200 p-2 mx-10">
                                <div className="w-full flex flex-row space-x-2">
                                    <svg
                                        className="w-5 h-5 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <div>Full Name</div>
                                    <div className="text-gray-400">{user?.first_name}</div>
                                    <div className="text-gray-400">{user?.last_name}</div>
                                </div>
                                <button type="button">
                                    <img className="h-5 w-5" src="../../../../assets/thumbnails/edit.svg" alt="Edit" />
                                </button>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 p-2 mx-10">
                                <div className="flex flex-row space-x-2">
                                    <svg
                                        className="w-5 h-5 text-blue-400"
                                        width="14"
                                        height="22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7 13A6 6 0 107 1a6 6 0 000 12zM7 13v8M4 17h6"
                                            stroke="#40BFFF"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div>Gender</div>
                                    <div className="text-gray-400">Male</div>
                                </div>

                                <button type="button">
                                    <img className="h-5 w-5" src="../../../../assets/thumbnails/edit.svg" alt="Edit" />
                                </button>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 p-2 mx-10">
                                <div className="flex flex-row space-x-2">
                                    <svg
                                        className="w-5 h-5 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div>Email</div>
                                    <div className="text-gray-400">{user?.email}</div>
                                </div>

                                <button type="button">
                                    <img className="h-5 w-5" src="../../../../assets/thumbnails/edit.svg" alt="Edit" />
                                </button>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 p-2 mx-10">
                                <div className="flex flex-row space-x-2">
                                    <svg
                                        className="w-5 h-5 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div>Phone number</div>
                                    <div className="text-gray-400">{user?.phone_number}</div>
                                </div>

                                <button type="button">
                                    <img className="h-5 w-5" src="../../../../assets/thumbnails/edit.svg" alt="Edit" />
                                </button>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 p-2 mx-10">
                                <div className="flex flex-row space-x-2">
                                    <svg
                                        className="w-5 h-5"
                                        width="20"
                                        height="20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0 7.75a1 1 0 011-1h18a1 1 0 011 1V19a1 1 0 01-1 1H1a1 1 0 01-1-1V7.75zm2 1V18h16V8.75H2z"
                                            fill="#40BFFF"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10 2C7.481 2 5.375 4.132 5.375 6.841a1 1 0 01-2 0C3.375 3.099 6.306 0 10 0s6.625 3.1 6.625 6.841a1 1 0 11-2 0C14.625 4.132 12.519 2 10 2zM10 11.726a1 1 0 011 1v1.125a1 1 0 11-2 0v-1.125a1 1 0 011-1z"
                                            fill="#40BFFF"
                                        />
                                    </svg>
                                    <div>Password</div>
                                    <div className="text-gray-400">{user?.password}</div>
                                </div>

                                <button type="button">
                                    <img className="h-5 w-5" src="../../../../assets/thumbnails/edit.svg" alt="Edit" />
                                </button>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 p-2 mx-10">
                                <div className="flex flex-row space-x-2">
                                    <svg
                                        className="w-5 h-5 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div>Address</div>
                                    <div className="text-gray-400">{user?.address}</div>
                                </div>

                                <button type="button">
                                    <img className="h-5 w-5" src="../../../../assets/thumbnails/edit.svg" alt="Edit" />
                                </button>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 p-2 mx-10">
                                <div className="flex flex-row space-x-2">
                                    <svg
                                        className="w-5 h-5 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                        />
                                    </svg>
                                    <div>Country</div>
                                    <div className="text-gray-400">{user?.country_id}</div>
                                </div>

                                <button type="button">
                                    <img className="h-5 w-5" src="../../../../assets/thumbnails/edit.svg" alt="Edit" />
                                </button>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 p-2 mx-10">
                                <div className="flex flex-row space-x-2">
                                    <svg
                                        className="w-5 h-5 text-blue-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                        />
                                    </svg>
                                    <div>Postal code</div>
                                    <div className="text-gray-400">{user?.postal_code}</div>
                                </div>

                                <button type="button">
                                    <img className="h-5 w-5" src="../../../../assets/thumbnails/edit.svg" alt="Edit" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4 bg-gray-100 h-auto" />
                </div>
            </div>
        </div>
    );
};

export default Profile;
