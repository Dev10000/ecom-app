import React from 'react';
import Router from './router';
import CartContext from '../context/cart';
import AuthContext from '../context/auth';
import ThemeContext from '../context/theme';

import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

function App(): JSX.Element {
    return (
        <AuthContext.Provider value={useAuth()}>
            <ThemeContext.Provider value={useTheme()}>
                <CartContext.Provider value={useCart()}>
                    <Router />
                </CartContext.Provider>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
