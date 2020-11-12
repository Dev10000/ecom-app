import React from 'react';
import { NavLink } from 'react-router-dom';

const Checkout: React.FC = () => {
    return (
        <NavLink to="/checkout">
            <div className="flex items-center hover:text-blue-500">
                <button type="button" className="inline-flex text-xs items-center">
                    <span className="px-2">Items</span>
                    <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeWidth="2"
                        />
                    </svg>
                    <span>0.00</span>
                </button>
            </div>
        </NavLink>
    );
};

export default Checkout;
