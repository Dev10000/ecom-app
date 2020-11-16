import React from 'react';

const PriceSummary: React.FC = (): JSX.Element => {
    return (
        <div className="w-64 text-base mx-12">
            <div className="border-b border-gray-200">
                <div className="flex justify-between mt-2">
                    <span>Subtotal</span>
                    <span>100</span>
                </div>

                <div className="flex justify-between mt-2">
                    <span>Shipping fee</span>
                    <span>20</span>
                </div>

                <div className="flex justify-between mt-2 pb-4">
                    <span>Coupon</span>
                    <span>No</span>
                </div>
            </div>
            <div className="flex justify-between mt-2">
                <span>Total</span>
                <span>120</span>
            </div>
            <button
                type="button"
                className="block w-full mt-2 items-center px-1 py-1 text-md border rounded border-gray-400 bg-blue-500 hover:bg-blue-700 text-white hover:shadow-md select-none focus:outline-none transition ease-in-out duration-150"
            >
                Checkout
            </button>
            <div>
                <form className="text-base mt-10">
                    <input
                        id="coupon"
                        placeholder="Enter coupon code"
                        className="border round border-gray-400 px-1 py-1 text-md focus:outline-none "
                    />
                    <button
                        type="submit"
                        className="inline-flex px-2 py-1 items-center text-md border rounded border-gray-400 bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md select-none focus:outline-none transition ease-in-out duration-150"
                    >
                        Redeem
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PriceSummary;
