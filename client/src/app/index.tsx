import React from 'react';
import Router from './router';
import CartContext from '../context/cart';
import useCart from '../hooks/useCart';
import AuthContext from '../context/auth';
import useAuth from '../hooks/useAuth';

function App(): JSX.Element {
    return (
        <AuthContext.Provider value={useAuth()}>
            <CartContext.Provider value={useCart()}>
                <Router />
            </CartContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
