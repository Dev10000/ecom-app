import React from 'react';
import Layout from './layout';
import Router from './router';
import CartContext from '../context/cart';
import useCart from '../hooks/useCart';

function App(): JSX.Element {
    return (
        <CartContext.Provider value={useCart()}>
            <Layout>
                <Router />
            </Layout>
        </CartContext.Provider>
    );
}

export default App;
