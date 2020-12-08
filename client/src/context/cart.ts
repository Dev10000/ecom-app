/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const initialState = {
    cartItems: [],
    addProduct: () => {},
    removeProduct: () => {},
    updateQuantity: () => {},
};

const CartContext = createContext<IUseCart>(initialState);

export default CartContext;
