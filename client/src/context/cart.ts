/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const initialState = {
    cartItems: [] as ICartProducts[],
    addProduct: () => {},
    removeProduct: () => {},
    updateQuantity: () => {},
};

const CartContext = createContext<IUseCart>(initialState);

export default CartContext;
