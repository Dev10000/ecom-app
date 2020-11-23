import React, { useState, useContext } from 'react';
import { formatCurrency } from '../../../utils';
import CartContext from '../../../context/cart';

const PriceSummary: React.FC = (): JSX.Element => {
    const [couponCode, setCouponCode] = useState('');
    const { cartItems } = useContext(CartContext);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + (item.quantity * item.price * (100 - item.discount)) / 100,
        0,
    );

    const handleCouponRedeem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`If not empty, check the server for a coupon with name ${couponCode}, and handle the response...`);
    };

    const handleCheckout = () => {
        console.log('save the order here');
    };

    return (
        <div className="flex justify-between">
            <div>
                <form className="text-base mt-10" onSubmit={handleCouponRedeem}>
                    <input
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="border rounded-l-md border-gray-400 p-3 text-md focus:outline-none "
                    />
                    <button
                        type="submit"
                        className="inline-flex -mx-1 px-4 py-3 items-center text-md border rounded-r-md border-gray-400 bg-blue-400 hover:bg-blue-500 text-white hover:shadow-md select-none focus:outline-none transition ease-in-out duration-150"
                    >
                        Redeem
                    </button>
                </form>
            </div>
            <div className="w-64 text-base m-12">
                <div className="border-b border-gray-200">
                    <div className="flex justify-between mt-2">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>

                    <div className="flex justify-between mt-2">
                        <span>Shipping fee</span>
                        <span>{formatCurrency(20)}</span>
                    </div>

                    <div className="flex justify-between mt-2 pb-4">
                        <span>Coupon</span>
                        <span>No</span>
                    </div>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Total</span>
                    <span>{formatCurrency(subtotal + 20)}</span>
                </div>
                <button
                    type="button"
                    className="block w-full mt-3 items-center px-1 py-3 text-md border rounded border-gray-200 bg-blue-400 hover:bg-blue-500 text-white hover:shadow-md select-none focus:outline-none transition ease-in-out duration-150"
                    onClick={handleCheckout}
                >
                    Check out
                </button>
            </div>
        </div>
    );
};

export default PriceSummary;
