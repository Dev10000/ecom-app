import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductLink: React.FC = (): JSX.Element => {
    return (
        <div className="bg-gray-100 w-full">
            <div className="flex items-center text-sm py-2 px-4">
                <span className="text-blue-600 cursor-pointer">
                    <NavLink to="/">Home</NavLink>
                </span>
                {/* TODO: fix this hardcoded stuff.. */}
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-600 mx-1">Cart</span>
            </div>
        </div>
    );
};

export default ProductLink;
