import React from 'react';
import Layout from './layout';
import Router from './router';
import CartContext from '../context/cart';
import useCart from '../hooks/useCart';

function App(): JSX.Element {
    const { cartItems } = useCart();

    return (
        <CartContext.Provider value={cartItems}>
            <Layout>
                <Router />
            </Layout>
        </CartContext.Provider>
    );
}

export default App;
