import React from 'react';

const SearchIcon: React.FC = (): JSX.Element => {
    return (
        <svg
            className="hover:text-blue-500"
            width="20"
            height="20"
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
    );
};

export default SearchIcon;