/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const initialState = {
    cartItems: [],
    addProduct: () => {},
    addProducts: () => {},
    removeProduct: () => {},
    updateQuantity: () => {},
};

const CartContext = createContext<IUseCart>(initialState);

export default CartContext;
