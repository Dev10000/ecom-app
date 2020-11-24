import React from 'react';

const Search: React.FC = (): JSX.Element => {
    return (
        <div className="w-screen text-center">
            <form className="text-base mt-10">
                <input
                    id="search"
                    placeholder="Search query..."
                    className="border rounded-l-md border-gray-400 p-3 text-md focus:outline-none "
                />
                <button
                    type="button"
                    className="inline-flex -mx-1 px-4 py-3 items-center text-md border rounded-r-md border-gray-400 bg-blue-400 hover:bg-blue-500 text-white hover:shadow-md select-none focus:outline-none transition ease-in-out duration-150"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default Search;
