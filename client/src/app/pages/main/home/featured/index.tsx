import React from 'react';
import Img1 from './shoe.png';
import Img2 from './shoe2.png';
import Img3 from './bag.png';

const Featured: React.FC = (): JSX.Element => {
    return (
        <div className="flex flex-cols-3 gap-4 max-w-full mb-16">
            <div className="flex mx-auto px-4 sm:max-w-auto mx-auto rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="flex-1 md:flex-shrink-0 relative">
                        <img className="h-56 w-full object-cover border-2 md:w-62" src={Img1} alt="img" />
                        <span className="text-center text-white bg-red-500 absolute top-4 left-4 w-10">HOT</span>
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
                            <span className="text-red-400">$ 299 </span>
                            <span className="line-through text-gray-300">$ 399</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mx-auto px-4 sm:max-w-md mx-auto rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="flex-1 md:flex-shrink-0 relative">
                        <img className="h-56 w-full object-cover border-2 md:w-62" src={Img2} alt="img" />
                        <span className="text-center text-white bg-red-500 absolute top-4 left-4 w-10">HOT</span>
                    </div>
                    <div className="flex-1 pl-4">
                        <div className="uppercase tracking-wide text-sm font-semibold mt-8 mb-6">
                            Nike Air Max <br /> 200 React
                        </div>
                        <div>
                            <span className="text-yellow-400">&#10025; &#10025; &#10025; &#10025;</span>
                            <span>&#10025;</span>
                        </div>
                        <br />
                        <div>
                            <span className="text-red-400">$ 199 </span>
                            <span className="line-through text-gray-300">$ 299</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mx-auto px-4 sm:max-w-md mx-auto rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="flex-1 md:flex-shrink-0 relative">
                        <img className="h-56 w-full object-cover border-2 md:w-62" src={Img3} alt="img" />
                        <span className="text-center text-white bg-red-500 absolute top-4 left-4 w-10">HOT</span>
                    </div>
                    <div className="flex-1 pl-4">
                        <div className="uppercase tracking-wide text-sm font-semibold mt-8 mb-6">
                            Nike Air Max <br /> 300 React
                        </div>
                        <div>
                            <span className="text-yellow-400">&#10025; &#10025; &#10025; &#10025;</span>
                            <span>&#10025;</span>
                        </div>
                        <br />
                        <div>
                            <span className="text-red-400">$ 399 </span>
                            <span className="line-through text-gray-300">$ 499</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
