import React from 'react';

const Featured: React.FC = (): JSX.Element => {
    return (
        <div className="flex flex-cols-3 gap-4 max-w-screen mt-1 ml-12 mr-12">
            <div className="max-w-md mx-auto bg-white rounded-xl rounded-yl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="flex-1 md:flex-shrink-0">
                        <img
                            className="h-56 w-full object-cover md:w-48"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="img"
                        />
                    </div>
                    <div className="flex-1 pl-4">
                        <div className="uppercase tracking-wide text-sm font-semibold mt-8 mb-6">
                            Blue Swade Nike <br /> Sneakers
                        </div>
                        <div>
                            <span className="text-yellow-400">&#10025; &#10025; &#10025; &#10025;</span>
                            <span>&#10025;</span>
                        </div>
                        <br />
                        <div>
                            <span className="text-red-400">$ 499 </span>
                            <span className="line-through text-gray-300">$ 599</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="flex-1 md:flex-shrink-0">
                        <img
                            className="h-56 w-full object-cover md:w-48"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="img"
                        />
                    </div>
                    <div className="flex-1 pl-4">
                        <div className="uppercase tracking-wide text-sm font-semibold mt-8 mb-6">
                            Blue Swade Nike <br /> Sneakers
                        </div>
                        <div>
                            <span className="text-yellow-400">&#10025; &#10025; &#10025; &#10025;</span>
                            <span>&#10025;</span>
                        </div>
                        <br />
                        <div>
                            <span className="text-red-400">$ 499 </span>
                            <span className="line-through text-gray-300">$ 599</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="flex-1 md:flex-shrink-0">
                        <img
                            className="h-56 w-full object-cover md:w-48"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="img"
                        />
                    </div>
                    <div className="flex-1 pl-4">
                        <div className="uppercase tracking-wide text-sm font-semibold mt-8 mb-6">
                            Blue Swade Nike <br /> Sneakers
                        </div>
                        <span className="text-yellow-400">&#10025; &#10025; &#10025; &#10025;</span>
                        <span>&#10025;</span>
                        <br />

                        <span className="text-red-400">$ 499 </span>
                        <span className="line-through text-gray-300">$ 599</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
