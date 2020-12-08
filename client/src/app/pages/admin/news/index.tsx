import React from 'react';

const News: React.FC = (): JSX.Element => {
    return (
        <div>
            <div className="bg-white shadow">
                <div className="px-4 sm:px-6 lg:mx-auto lg:px-8">
                    <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between lg:border-t lg:border-gray-200">
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-700 sm:leading-9 sm:truncate">
                            News Articles
                        </h1>
                        <button
                            type="button"
                            className="mt-4 mr-4 md:mt-0 text-center inline-flex items-center pl-2 pr-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6 mr-2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8v8M8 12h8" />
                            </svg>
                            <span> Write New</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4">package to add https://github.com/jpuri/react-draft-wysiwyg</div>
        </div>
    );
};

export default News;
