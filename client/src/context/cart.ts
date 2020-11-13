import { createContext } from 'react';

const CartContext = createContext<ICartProducts[]>([]);

export default CartContext;
