import { useState } from 'react';

const useCart = (): IUseCart => {
    const [cartItems, setCartItems] = useState<ICartProducts[]>([]);

    const addProduct = (product: IProduct): void => {
        setCartItems((prev) => {
            const existing = cartItems.find((item) => item.id === product.id);

            return !existing
                ? [...prev, { ...product, quantity: 1 }]
                : [
                      ...cartItems.map((item) =>
                          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                      ),
                  ];
        });
    };

    const removeProduct = (product: IProduct): void => {
        setCartItems((prev) => [...prev.filter((item) => item.id !== product.id)]);
    };

    // eslint-disable-next-line consistent-return
    const updateQuantity = (product: IProduct, newQuantity: number): void => {
        if (newQuantity === 0) return removeProduct(product);

        setCartItems((prev) => [
            ...prev.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item)),
        ]);
    };

    return {
        cartItems,
        addProduct,
        removeProduct,
        updateQuantity,
    };
};

export default useCart;
