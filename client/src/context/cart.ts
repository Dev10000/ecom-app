import { createContext } from 'react';

const initialState = {
    cartItems: [] as ICartProducts[],
    addProduct: () => {
        console.log('this is insane. At this point TS doesn`t make sense!');
    },
    removeProduct: () => {
        console.log('this is insane. At this point TS doesn`t make sense!');
    },
    updateQuantity: () => {
        console.log('this is insane. At this point TS doesn`t make sense!');
    },
};

const CartContext = createContext<IUseCart>(initialState);

export default CartContext;
