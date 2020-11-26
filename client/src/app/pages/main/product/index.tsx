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

    const handleSliderRight = (): void => {
        console.log('Button clicked');
        if (sliderIndex > 0) {
            setSliderIndex(sliderIndex + 1);
            setSliderProduct(categoryProducts[sliderIndex]);
        }
    };

    const handleSliderLeft = () => {
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
            })
            .catch((err) => {
                return err;
            });
    }, [productId, categoryId]);

    return (
        <div className="flex flex-col text-sm">
            <div className="bg-gray-100 h-10 w-full" />
            <div>
                <div className="flex flex-row space-x-20 mx-10">
                    <div className="h-auto w-40">
                        <img
                            src={`${product?.image?.find((image) => image.default_img === true)?.href}`}
                            alt={`${product?.title}`}
                        />
                    </div>
                    <div>
                        <div className="text-lg font-extrabold">{product?.title}</div>
                        <div className="flex flex-row items-center text-xs justify-between border-b border-gray-200 mt-10">
                            <div>Rating</div>
                            <div>0 reviews</div>
                            <button type="button" className="text-blue-400">
                                Submit a review
                            </button>
                        </div>
                        {product?.discount && product?.discount > 0 ? (
                            <div>
                                <div className="text-blue-400">{product?.price * (1 - product?.discount * 0.01)}</div>
                                <div className="line-through">{product?.price}</div>
                                <div className="text-red-800">{product?.discount}</div>
                            </div>
                        ) : (
                            <div className="text-blue-400">{product?.price}</div>
                        )}
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                                <div>Availability:</div>
                                {product && product.stock_qty === 0 ? <div>None</div> : <div>In stock</div>}
                            </div>
                            <div className="flex flex-row justify-between">
                                <div>Category:</div>
                                {product ? <div>{categoryName}</div> : ''}
                            </div>
                        </div>
                        <div className="border-b border-gray-200">Free shipping</div>
                        <div className="flex flex-row justify-between">
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
                        <div className="flex flex-row items-center justify-between">
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
                    <div className="flex flex-row items-center">
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
                        <div>
                            <img
                                src={`${sliderProduct?.image?.filter((image) => image.default_img === true)[0].href}`}
                                alt={`${sliderProduct?.title}`}
                            />
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
        </div>
    );
};

export default Product;
