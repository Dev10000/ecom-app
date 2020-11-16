import React from 'react';
import PriceSummary from './PriceSummary';
import ProductLink from '../../../ui/breadcrumbs';
import ProductList from './ProductList';

const ViewCart: React.FC = (): JSX.Element => {
    return (
        <div className="mt-8">
            <div className="">
                <ProductLink />
            </div>
            <div className="mt-8 flex justify-between">
                <div>
                    <div className="border-b border-gray-200 p-4 mx-10">
                        <div className="flex justify-between items-center text-base font-medium">
                            <div className="mx-14">PRODUCT</div>
                            <div className="flex space-x-24 mx-56">
                                <div className="text-gray-800 hover:text-blue-500">PRICE</div>
                                <div className="text-gray-800">QTY</div>
                                <div className="text-gray-800 hover:text-blue-500">UNIT PRICE</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ProductList />
                    </div>
                </div>
                <div>
                    <div>
                        <PriceSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCart;
