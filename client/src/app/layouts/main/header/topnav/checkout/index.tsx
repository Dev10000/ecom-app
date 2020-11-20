import React, { useContext } from 'react';
import CartContext from '../../../../../../context/cart';
import { formatCurrency } from '../../../../../../utils';

const Checkout: React.FC = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className="flex items-center">
            <div className="inline-flex text-md items-center">
                <span className="pr-2 select-none">Items</span>
                <span className="text-gray-600 dark:text-gray-400">
                    {formatCurrency(
                        cartItems.reduce(
                            (acc, item) => acc + (item.quantity * item.price * (100 - item.discount)) / 100,
                            0,
                        ),
                    )}
                </span>
            </div>
        </div>
    );
};

export default Checkout;
