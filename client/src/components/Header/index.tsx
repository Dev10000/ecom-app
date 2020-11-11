import React from 'react';
import CartIcon from './CartIcon';
import Languages from './Languages';
import Checkout from './Checkout';
import SearchIcon from './SearchIcon';
import Modals from '../Modals';

const Header: React.FC = (): JSX.Element => {
    return (
        <div>
            <div className="mx-10">
                <nav className="flex items-center justify-between">
                    <div>
                        <Languages />
                    </div>
                    <div className="flex space-x-10">
                        <Modals />
                        <CartIcon />
                        <Checkout />
                        <SearchIcon />
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
