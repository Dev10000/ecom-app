/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';

// TODO: maybe only store id's and quantities and not the whole product info
const getCartItems = (): ICartProducts[] => {
    const storedCartItems = localStorage.getItem('cart');
    if (!storedCartItems) return [];
    return JSON.parse(storedCartItems);
};

const useCart = (): IUseCart => {
    const [cartItems, setCartItems] = useState<ICartProducts[]>(getCartItems());

    const addProduct = (product: IProduct, quantity?: number): void => {
        const existingInCart = cartItems.find((item) => item.id === product.id);

        if (!quantity) quantity = 1;

        const updatedCart = !existingInCart
            ? [...cartItems, { ...product, quantity }]
            : [
                  ...cartItems.map((item) =>
                      item.id === product.id ? { ...item, quantity: item.quantity + quantity! } : item,
                  ),
              ];

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeProduct = (product: IProduct): void => {
        const updatedCart = [...cartItems.filter((item) => item.id !== product.id)];

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // eslint-disable-next-line consistent-return
    const updateQuantity = (product: IProduct, newQuantity: number): void => {
        if (newQuantity === 0) return removeProduct(product);

        const updatedCart = [
            ...cartItems.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item)),
        ];

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return {
        cartItems,
        addProduct,
        removeProduct,
        updateQuantity,
    };
};

export default useCart;
