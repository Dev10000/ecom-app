import React from 'react';

const Products: React.FC = (): JSX.Element => {
    return (
        <div>
            <div className="bg-white shadow">
                <div className="px-4 sm:px-6 lg:mx-auto lg:px-8">
                    <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-700 sm:leading-9 sm:truncate">
                            Products
                        </h1>
                    </div>
                </div>
            </div>
            <div>Actual content</div>
        </div>
    );
};

export default Products;
