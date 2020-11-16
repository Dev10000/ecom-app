import React from 'react';

const ProductLink: React.FC = (): JSX.Element => {
    return (
        <div className="bg-gray-100 w-screen">
            <div className="flex items-center text-sm p-2">
                <span className="text-blue-600">Home </span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-blue-600 mx-1">Hot Deal </span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-800 mx-1">Nike blue </span>
            </div>
        </div>
    );
};

export default ProductLink;
