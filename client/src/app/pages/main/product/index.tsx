import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Product: React.FC = () => {
    const [product, setProduct] = useState<IProduct>();
    const [productId] = useState<number>(1);
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryId, setCategoryId] = useState<number>(223);
    const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([]);
    const [sliderProduct, setSliderProduct] = useState<IProduct>(categoryProducts[0]);
    const [sliderIndex, setSliderIndex] = useState<number>(0);
    console.log(categoryProducts);

    const handleSliderRight = (): void => {
        setSliderIndex(sliderIndex + 1);
        setSliderProduct(categoryProducts[sliderIndex]);
    };

    const handleSliderLeft = (): void => {
        setSliderIndex(sliderIndex - 1);
        setSliderProduct(categoryProducts[sliderIndex]);
    };

    useEffect(() => {
        axios
            .get(`/products/${productId}`)
            .then((response) => {
                setProduct(response.data.data);
                setCategoryId(response.data.data.product_category_id);
            })
            .catch((err) => {
                return err;
            });

        axios
            .get(`/categories`)
            .then((response) => {
                setCategoryName(
                    response.data.data.find((category: IProductCategory) => category.id === categoryId).title,
                );
            })
            .catch((err) => {
                return err;
            });
        axios
            .get(`/categories/${categoryId}/products`)
            .then((response) => {
                console.log(response.data.data);
                setCategoryProducts(response.data.data);
                return response.data.data;
            })
            .catch((err) => {
                return err;
            });
    }, [productId, categoryId]);

    return (
        <div className="flex flex-col text-sm">
            <div className="bg-gray-100 h-10 w-full" />
            <div>
                <div className="flex flex-col sm:flex-row space-x-20 mx-10 justify-center sm:justify-between">
                    <div className="flex flex-row justify-center">
                        <div className="h-auto w-56 p-5 border shadow border-gray-300">
                            <img
                                src={`${product?.image?.find((image) => image.default_img === true)?.href}`}
                                alt={`${product?.title}`}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <div className="flex flex-col">
                                <div className="text-lg font-extrabold">{product?.title}</div>
                                <div className="flex flex-row items-center text-xs mt-2 justify-between border-b border-gray-200">
                                    <div className="mb-2">Rating</div>
                                    <div className="mb-2">0 reviews</div>
                                    <button type="button" className="text-blue-400 mb-2">
                                        Submit a review
                                    </button>
                                </div>
                                {product?.discount && product?.discount > 0 ? (
                                    <div className="mt-3">
                                        <div className="text-blue-400">
                                            {product?.price * (1 - product?.discount * 0.01)}
                                        </div>
                                        <div className="line-through">{product?.price}</div>
                                        <div className="text-red-800">{product?.discount}</div>
                                    </div>
                                ) : (
                                    <div className="text-blue-400 mt-3">{product?.price}</div>
                                )}
                                <div className="flex flex-col mt-4">
                                    <div className="flex flex-row justify-between mt-2">
                                        <div>Availability:</div>
                                        {product && product.stock_qty === 0 ? <div>None</div> : <div>In stock</div>}
                                    </div>
                                    <div className="flex flex-row justify-between mt-2">
                                        <div>Category:</div>
                                        {product ? <div>{categoryName}</div> : ''}
                                    </div>
                                </div>
                                <div className="border-b border-gray-200 mt-2">
                                    <div className="mb-3">Free shipping</div>
                                </div>
                                <div className="flex flex-row justify-between mt-2">
                                    <div>Select color</div>
                                    <div className="flex flex-row items-center space-x-2">
                                        <button type="button">
                                            <div className="border rounded-full h-4 w-4 bg-blue-400" />
                                        </button>
                                        <button type="button">
                                            <div className="border rounded-full h-4 w-4 bg-red-500" />
                                        </button>
                                        <button type="button">
                                            <div className="border rounded-full h-4 w-4 bg-gray-800" />
                                        </button>
                                        <button type="button">
                                            <div className="border rounded-full h-4 w-4 bg-yellow-600" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-between mt-2">
                                    <div>Size:</div>
                                    <div className="border rounded shadow border-gray-300 w-20 flex justify-end">
                                        <select>
                                            <option>S</option>
                                            <option>M</option>
                                            <option>L</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <button type="button" onClick={handleSliderLeft}>
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <div className="w-48 border shadow border-gray-300">
                            <div className="h-48 w-auto">
                                <img
                                    src={`${
                                        sliderProduct?.image?.filter((image) => image.default_img === true)[0].href
                                    }`}
                                    alt={`${sliderProduct?.title}`}
                                />
                            </div>
                            <div className="border-t border-gray-300 h-24 flex flex-col justify-center">
                                <div className="flex flex-row justify-center">
                                    <div className="text-xs">Rating</div>
                                </div>
                                {sliderProduct?.discount && sliderProduct?.discount > 0 ? (
                                    <div className="flex flex-row justify-center space-x-5">
                                        <div className="text-blue-400">
                                            {sliderProduct?.price * (1 - sliderProduct?.discount * 0.01)}
                                        </div>
                                        <div className="line-through">{sliderProduct?.price}</div>
                                        <div className="text-red-800">{sliderProduct?.discount}</div>
                                    </div>
                                ) : (
                                    <div className="flex flex-row justify-center space-x-5">
                                        <div className="text-blue-400">{sliderProduct?.price}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button type="button" onClick={handleSliderRight}>
                            <div>
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <div>Images</div>
                <div>Counter</div>
                <div>Cart</div>
            </div>
            <div className="flex flex-row">
                <div>facebook</div>
                <div>twitter</div>
            </div>
        </div>
    );
};

export default Product;
