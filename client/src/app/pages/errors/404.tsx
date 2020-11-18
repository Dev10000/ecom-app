import React from 'react';
import NotFound from './404.svg';

const E404: React.FC = (): JSX.Element => {
    return (
        <div className="w-full my-6">
            <img className="w-72 h-auto mx-auto" src={NotFound} alt="Page not found!" />
            <div className="w-full text-center text-blue-500 text-2xl mt-3">Page not found!</div>
        </div>
    );
};

export default E404;
