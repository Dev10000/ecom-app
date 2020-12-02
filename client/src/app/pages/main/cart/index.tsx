import React, { useContext } from 'react';
import PriceSummary from './PriceSummary';
import CartContext from '../../../../context/cart';
import EmptyCart from './empty.svg';
import { formatCurrency } from '../../../../utils';

const Cart: React.FC = (): JSX.Element => {
    const { cartItems, removeProduct, updateQuantity } = useContext(CartContext);

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
                <>
                    <div className="overflow-x-auto">
                        <div className="min-w-full">
                            <table className="min-w-full divide-y divide-gray-200" cellSpacing={0} cellPadding={0}>
                                <thead>
                                    <tr className="uppercase text-gray-700 dark:text-gray-200 p-4 mx-10 text-base font-medium">
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
                                                    className="flex items-center px-3"
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
                                            <td className="relative inline-flex items-center lg:whitespace-nowrap">
                                                <img
                                                    className="mr-3 my-4 rounded shadow"
                                                    src="https://via.placeholder.com/140x95?text=ProductImage"
                                                    alt={item.title}
                                                />
                                                <div>{item.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 mx-auto">
                                                <div className="inline-flex w-24 items-center justify-between">
                                                    <button
                                                        className="w-12 text-blue-400 font-medium text-lg p-2 bg-gray-200 dark:bg-gray-800 rounded-l-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue select-none"
                                                        type="button"
                                                        onClick={() => updateQuantity(item, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <div className="w-full text-center text-lg border-t border-b border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 p-2">
                                                        {item.quantity}
                                                    </div>
                                                    <button
                                                        className="w-12 text-blue-400 font-medium text-lg p-2 bg-gray-200 dark:bg-gray-800 rounded-r-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue select-none"
                                                        type="button"
                                                        onClick={() => updateQuantity(item, item.quantity + 1)} // TODO: prevent adding more than item.stock_qty
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm leading-5">
                                                {/* TODO: what to do? :) The almighty typescript swears that my variable is a NUMBER but it's nothing but a STRING! */}
                                                {!item.discount ? (
                                                    formatCurrency(item.price * 1)
                                                ) : (
                                                    <div className="inline-flex items-center space-x-1">
                                                        <span className="line-through text-red-500">
                                                            {formatCurrency(item.price * 1)}
                                                        </span>
                                                        <span>
                                                            {formatCurrency((item.price * (100 - item.discount)) / 100)}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm leading-5">
                                                {!item.discount ? (
                                                    formatCurrency(item.price * item.quantity)
                                                ) : (
                                                    <>
                                                        <div className="inline-flex items-center space-x-1">
                                                            <span className="line-through text-gray-500">
                                                                {formatCurrency(item.price * item.quantity)}
                                                            </span>
                                                            <span>
                                                                {formatCurrency(
                                                                    item.quantity *
                                                                        ((item.price * (100 - item.discount)) / 100),
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs italic text-green-500 font-medium">
                                                            {`You save ${formatCurrency(
                                                                item.price * item.quantity -
                                                                    item.quantity *
                                                                        ((item.price * (100 - item.discount)) / 100),
                                                            )}!`}
                                                        </div>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <PriceSummary />
                </>
            )}
        </div>
    );
};

export default Cart;
