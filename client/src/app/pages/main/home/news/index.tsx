import React from 'react';
import Img1 from './logo1.png';
import Img2 from './logo2.png';
import Img3 from './logo3.png';

const News: React.FC = (): JSX.Element => {
    return (
        <div className="flex flex-cols-3 gap-4 max-w-full mb-16">
            <div className="flex mx-auto px-4 sm:max-w-md mx-auto rounded-xl rounded-yl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="flex-1 md:flex-shrink-0">
                        <img className="mt-8 mb-7 h-56 w-full object-cover md:w-48 h-auto" src={Img1} alt="img" />
                    </div>
                    <div className="flex-1 pl-4">
                        <span className="text-gray-300 text-sm font-semibold">16.12.2020</span>
                        <div className="uppercase tracking-wide text-sm font-semibold mt-2">Fashion Industry</div>

                        <br />
                        <div className="-mt-4">
                            <p>
                                Lorem Ipsum
                                <br /> is simply dummy
                                <br /> text of the
                                <br /> printing and typesetting
                                <br /> industry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mx-auto px-4 sm:max-w-md mx-auto rounded-xl rounded-yl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="flex-1 md:flex-shrink-0">
                        <img className="h-56 w-full object-cover md:w-48 h-auto" src={Img2} alt="img" />
                    </div>
                    <div className="flex-1 pl-4">
                        <span className="text-gray-300 text-sm font-semibold ">16.12.2020</span>
                        <div className="uppercase tracking-wide text-sm font-semibold mt-2">
                            Best Design
                            <br /> tools
                        </div>

                        <br />
                        <div className="-mt-4">
                            <p>
                                Lorem Ipsum
                                <br /> is simply dummy
                                <br /> text of the
                                <br /> printing and typesetting
                                <br /> industry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mx-auto px-4 sm:max-w-md mx-auto rounded-xl rounded-yl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="flex-1 md:flex-shrink-0">
                        <img className="mt-4 mb-4 h-56 w-full object-cover md:w-48 h-auto" src={Img3} alt="img" />
                    </div>
                    <div className="flex-1 pl-4">
                        <span className="text-gray-300 text-sm font-semibold ">16.12.2020</span>
                        <div className="uppercase tracking-wide text-sm font-semibold mt-2">HR Community</div>

                        <br />
                        <div className="-mt-4">
                            <p>
                                Lorem Ipsum
                                <br /> is simply dummy
                                <br /> text of the
                                <br /> printing and typesetting
                                <br /> industry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
