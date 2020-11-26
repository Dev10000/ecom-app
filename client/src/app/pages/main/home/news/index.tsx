import React from 'react';

const News: React.FC = (): JSX.Element => {
    return (
        <div className="flex max-w-screen mt-1">
            <div className="flex-cols-3 w-screen sm:flex flex-row justify-between w-full dark:bg-gray-800 text-xs p-16">
                <div className="flex flex-cols-2 gap-4">
                    <div className="flex items-center w-28">
                        <img
                            className="w-96 h-54"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="Lorem ipsum"
                        />
                    </div>
                    <div className="w-36">
                        <h4 className="text-gray-300 mb-1">16.12.2020</h4>
                        <h2 className="font-bold mb-1 text-base">Fashion Industry</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.</p>
                    </div>
                </div>
                <div className="flex flex-cols-2 gap-4">
                    <div className="flex items-center w-28">
                        <img
                            className="w-96 h-54"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="Lorem ipsum"
                        />
                    </div>
                    <div className="w-36">
                        <h4 className="text-gray-300 mb-1">16.12.2020</h4>
                        <h2 className="font-bold mb-1 text-base">Best Design tools</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.</p>
                    </div>
                </div>
                <div className="flex flex-cols-2 gap-4">
                    <div className="flex items-center w-28">
                        <img
                            className="w-96 h-54"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="Lorem ipsum"
                        />
                    </div>
                    <div className="w-36">
                        <h4 className="text-gray-300 mb-1">16.12.2020</h4>
                        <h2 className="font-bold mb-1 text-base">HR Community</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
