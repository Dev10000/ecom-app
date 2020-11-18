import React, { useContext } from 'react';
import PriceSummary from './PriceSummary';
import CartContext from '../../../context/cart';
import EmptyCart from './empty.svg';

const ViewCart: React.FC = (): JSX.Element => {
    // TEMPORARY!
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cartItems, addProduct, removeProduct, updateQuantity } = useContext(CartContext);

    return (
        <div className="mt-8 px-10">
            {!cartItems.length ? (
                <div className="w-full my-6">
                    <img className="w-72 h-auto mx-auto" src={EmptyCart} alt="Empty Cart" />
                    <div className="w-full text-center text-blue-500 text-2xl mt-3">
                        There are no products in your cart!
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200" cellSpacing={0} cellPadding={0}>
                        <thead>
                            <tr className="uppercase text-gray-700 p-4 mx-10 text-base font-medium">
                                <th className="w-12">&nbsp;</th>
                                <th>Product</th>
                                <th>QTY</th>
                                <th>Unit Price</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr className="border-b border-gray-200" key={item.id}>
                                    <td>
                                        <button
                                            className="flex items-center"
                                            type="button"
                                            onClick={() => removeProduct(item)}
                                        >
                                            <svg
                                                className="w-4 h-4 fill-current text-red-600 inline-block"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className="inline-flex items-center">
                                        <img
                                            className="mr-3 my-4 rounded shadow"
                                            src="https://via.placeholder.com/140x95?text=ProductImage"
                                            alt={item.title}
                                        />
                                        {item.title}
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        {/* TODO: The almighty typescript swears that my variable is a NUMBER but it's nothing but a STRING! */}
                                        {(item.price * 1).toLocaleString('en-IN', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        })}
                                    </td>
                                    <td>
                                        {(item.price * item.quantity).toLocaleString('en-IN', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div>
                        <PriceSummary />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCart;
