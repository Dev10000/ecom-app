import React from 'react';

const News: React.FC = (): JSX.Element => {
    return (
        <div className="flex max-w-screen mt-1">
            <div className="w-full dark:bg-gray-800 text-xs flex flex-row justify-between p-16">
                <div className="flex flex-cols-2 gap-4 w-58">
                    <div className="flex items-left w-24">
                        <img
                            className="w-96 h-54"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="Lorem ipsum"
                        />
                    </div>
                    <div className="w-32">
                        <h4 className="text-gray-300 mb-1">16.12.2020</h4>
                        <h2 className="font-bold mb-1">Fashion Industry</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                </div>
                <div className="flex flex-cols-2 gap-4 w-54">
                    <div className="flex items-left w-24">
                        <img
                            className="w-96 h-54"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="Lorem ipsum"
                        />
                    </div>
                    <div className="w-32">
                        <h4 className="text-gray-300 mb-1">16.12.2020</h4>
                        <h2 className="font-bold mb-1">Best Design tools</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                </div>
                <div className="flex flex-cols-2 gap-4 w-54">
                    <div className="flex items-left w-24">
                        <img
                            className="w-96 h-54"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="Lorem ipsum"
                        />
                    </div>
                    <div className="w-32">
                        <h4 className="text-gray-300 mb-1">16.12.2020</h4>
                        <h2 className="font-bold mb-1">HR Community</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
