import React from 'react';
import CartHeader from './CartHeader';
import PriceSummary from './PriceSummary';
import ProductLink from './ProductLink';
import ProductList from './ProductList';

const Cart: React.FC = (): JSX.Element => {
    return (
        <div className="mt-8">
            <div className="">
                <ProductLink />
            </div>
            <div className="mt-8 flex justify-between">
                <div>
                    <div>
                        <CartHeader />
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

export default Cart;
