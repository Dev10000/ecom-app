import React, { useContext } from 'react';
import CartContext from '../../../../../context/cart';

const Checkout: React.FC = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className="flex items-center">
            <div className="inline-flex text-md items-center">
                <span className="pr-2 select-none">Items</span>
                <span className="text-gray-600">
                    {cartItems
                        .reduce((acc, item) => acc + (item.quantity * item.price * (100 - item.discount)) / 100, 0)
                        .toLocaleString('en-IN', { style: 'currency', currency: 'EUR' })}
                </span>
            </div>
        </div>
    );
};

export default Checkout;
