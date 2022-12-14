import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CartContext from '../../../../../../context/cart';

const CartIcon: React.FC = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <NavLink to="/cart">
            <div className="flex items-center hover:text-blue-400">
                <button type="button" className="inline-block relative">
                    <svg
                        tabIndex={-1}
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <span className="absolute top-0 right-0 block h-6 w-6 transform -translate-y-2 translate-x-3 rounded-full text-xs pt-px font-medium text-white shadow-solid bg-red-400 border-2 border-white">
                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                </button>
            </div>
        </NavLink>
    );
};

export default CartIcon;
