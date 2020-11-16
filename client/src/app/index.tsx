import React from 'react';
import Layout from './layout';
import Router from './router';
import CartContext from '../context/cart';
import useCart from '../hooks/useCart';
import AuthContext from '../context/auth';
import useAuth from '../hooks/useAuth';

function App(): JSX.Element {
    const { values } = useAuth();
    return (
        <AuthContext.Provider value={values}>
            <CartContext.Provider value={useCart()}>
                <Layout>
                    <Router />
                </Layout>
            </CartContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
