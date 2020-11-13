import React from 'react';
import Layout from './layout';
import Router from './router';
import CartContext from '../context/cart';
import useCart from '../hooks/useCart';
import AuthContext, { initialState } from '../context/auth';

function App(): JSX.Element {
    return (
        <AuthContext.Provider value={initialState}>
            <CartContext.Provider value={useCart()}>
                <Layout>
                    <Router />
                </Layout>
            </CartContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
