/* eslint-disable react/self-closing-comp */
import React, { useContext } from 'react';
import ThemeContext from '../../../../../../context/theme';

const ThemeToggle: React.FC = (): JSX.Element => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div>
            <button
                type="button"
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-400 hover:bg-blue-500`}
                onClick={() => toggleTheme()}
            >
                <span
                    className={`${
                        theme === 'dark' ? 'translate-x-0' : 'translate-x-5'
                    } relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-100`}
                >
                    <span
                        className={`${
                            theme === 'dark' ? 'opacity-100 ease-in duration-100' : 'opacity-0 ease-out duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3 text-gray-800"
                        >
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    </span>
                    <span
                        className={`${
                            theme === 'dark' ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3"
                        >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </span>
                </span>
            </button>
        </div>
    );
};

export default ThemeToggle;
