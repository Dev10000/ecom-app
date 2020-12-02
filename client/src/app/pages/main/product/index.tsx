/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouteComponentProps, useLocation } from 'react-router';
import CartContext from '../../../../context/cart';

interface IProductState {
    productId: number;
}

const Product: React.FC = () => {
    const { addProducts } = useContext(CartContext);
    const location = useLocation<IProductState>();
    const [product, setProduct] = useState<IProduct>();
    const [productId, setProductId] = useState<number | undefined>(undefined);
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryId, setCategoryId] = useState<number>(105);
    const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([]);
    const [sliderProduct, setSliderProduct] = useState<IProduct>();
    const [sliderIndex, setSliderIndex] = useState<number>(1);
    const [featureProducts, setFeatureProducts] = useState<IProduct[]>([]);
    const [featureIndex, setFeatureIndices] = useState<number>(0);
    const [productImage, setProductImage] = useState<IProductImage>();
    const [productImages, setProductImages] = useState<IProductImage[]>([]);
    const [allProductImages, setAllProductImages] = useState<IProductImage[]>([]);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [sliderProductRightDisplay, setSliderProductRightDisplay] = useState<boolean>(true);
    const [sliderProductLeftDisplay, setSliderProductLeftDisplay] = useState<boolean>(false);
    const [featureProductRightDisplay, setFeatureProductRightDisplay] = useState<boolean>(true);
    const [featureProductLeftDisplay, setFeatureProductLeftDisplay] = useState<boolean>(false);
    const [productImagesRightDisplay, setProductImagesRightDisplay] = useState<boolean>(true);
    const [productImagesLeftDisplay, setProductImagesLeftDisplay] = useState<boolean>(false);

    // increase number of items
    const addCounter = () => {
        // eslint-disable-next-line camelcase
        if (product && product.stock_qty && quantity < product.stock_qty) {
            setQuantity(quantity + 1);
        }
    };
    // decrease number of items
    const subtractCounter = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    // set product display images
    const imageDisplay = (id: number | undefined) => {
        setProductImage(product?.image?.find((image) => image.id === id));
    };
    // slides product images right
    const sliderProductRight = (): void => {
        if (sliderIndex > categoryProducts.length - 2) {
            setSliderProductRightDisplay(false);
        } else {
            setSliderProductLeftDisplay(true);
            setSliderIndex(sliderIndex + 1);
            setSliderProduct(categoryProducts[sliderIndex]);
        }
    };
    // slides product images left
    const sliderProductLeft = (): void => {
        if (sliderIndex < 0) {
            setSliderProductLeftDisplay(false);
        } else {
            setSliderProductRightDisplay(true);
            setSliderIndex(sliderIndex - 1);
            setSliderProduct(categoryProducts[sliderIndex]);
        }
    };
    // slides product images right
    const featureProductRight = (): void => {
        if (featureIndex > categoryProducts.length - 4) {
            setFeatureProductRightDisplay(false);
        } else {
            setFeatureProductLeftDisplay(true);
            setFeatureIndices(featureIndex + 1);
            setFeatureProducts([...categoryProducts].splice(featureIndex, 4));
        }
    };
    // slides product images left
    const featureProductLeft = (): void => {
        if (featureIndex < 0) {
            setFeatureProductLeftDisplay(false);
        } else {
            setFeatureProductRightDisplay(true);
            setFeatureIndices(featureIndex - 1);
            setFeatureProducts([...categoryProducts].splice(featureIndex, 4));
        }
    };

    // slides product images right
    const productImagesRight = (): void => {
        if (imageIndex > allProductImages.length - 4) {
            setProductImagesRightDisplay(false);
        } else {
            setProductImagesLeftDisplay(true);
            setImageIndex(imageIndex + 1);
            setProductImages([...allProductImages].splice(imageIndex, 4));
        }
    };
    // slides product images left
    const productImagesLeft = (): void => {
        if (imageIndex > allProductImages.length - 4) {
            setProductImagesLeftDisplay(false);
        } else {
            setProductImagesRightDisplay(true);
            setImageIndex(imageIndex + 1);
            setProductImages([...allProductImages].splice(imageIndex, 4));
        }
    };
    useEffect(() => {
        setProductId(location.state.productId);
    }, [location]);
    useEffect(() => {
        axios
            .get(`/products/${productId}`)
            .then((response) => {
                setProduct(response.data.data);
                setCategoryId(response.data.data.product_category_id);
                setProductImage(response.data.data.image.find((image: IProductImage) => image.default_img === true));
                setAllProductImages(response.data.data.image);
                setProductImages(response.data.data.image.filter((image: IProductImage, index: number) => index < 4));
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
                setCategoryProducts(response.data.data);
                setSliderProduct(response.data.data[0]);
                setFeatureProducts(response.data.data.filter((item: IProduct, index: number) => index < 4));
                return response.data.data;
            })
            .catch((err) => {
                return err;
            });
    }, [productId, categoryId]);

    return (
        <div>
            <div className="bg-gray-100 h-10 w-full" />
            <div className="flex flex-col text-sm justify-center mx-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-10">
                    <div className="flex flex-col">
                        <div className="flex flex-col sm:flex-row mt-5 sm:justify-between">
                            <div className="flex flex-row justify-center">
                                <div>
                                    <div className="flex flex-row justify-center">
                                        <img
                                            className="h-72 w-auto p-10"
                                            src={`${productImage?.href}`}
                                            alt={`${product?.title}`}
                                        />
                                    </div>
                                    <div className="flex flex-row space-x-2">
                                        {productImagesLeftDisplay ? (
                                            <button
                                                type="button"
                                                onClick={productImagesLeft}
                                                className="hover:text-blue-400"
                                            >
                                                <svg
                                                    className="w-10 h-10 p-2 flex flex-row content-center"
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
                                        ) : (
                                            ''
                                        )}
                                        {productImages.map((element) => (
                                            <div
                                                key={element.id}
                                                className="border shadow border-gray-300 w-24 flex flex-col justify-center"
                                                onMouseEnter={() => imageDisplay(element.id)}
                                            >
                                                <div className="flex flex-row justify-center">
                                                    <img className="h-24 w-auto p-2" src={`${element.href}`} alt="" />
                                                </div>
                                            </div>
                                        ))}
                                        {productImagesRightDisplay ? (
                                            <button type="button" onClick={productImagesRight}>
                                                <svg
                                                    className="w-10 h-10 p-2 flex flex-row content-center"
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
                                            </button>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center mt-8">
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <div className="text-xl font-semibold">{product?.title}</div>
                                        <div className="flex flex-row items-center text-xs mt-4 justify-between border-b border-gray-200">
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
                                                {product && product.stock_qty === 0 ? (
                                                    <div>None</div>
                                                ) : (
                                                    <div>In stock</div>
                                                )}
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
                                        <div className="flex flex-row items-center justify-between mt-2 border-b border-gray-300">
                                            <div className="mb-4">Size:</div>
                                            <div className="border rounded shadow border-gray-300 w-20 flex justify-end mb-4">
                                                <select>
                                                    <option>S</option>
                                                    <option>M</option>
                                                    <option>L</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-row mt-5 items-center justify-between border-b border-gray-300">
                                            <div className="mb-4">
                                                <div className="inline-flex w-24 items-center justify-between border border-shadow rounded">
                                                    <button
                                                        onClick={subtractCounter}
                                                        className="w-12 p-1 text-blue-400 font-medium text-base bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue select-none"
                                                        type="button"
                                                    >
                                                        -
                                                    </button>
                                                    <div className="w-full p-1 text-center text-base border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800">
                                                        {quantity}
                                                    </div>
                                                    <button
                                                        onClick={addCounter}
                                                        className="w-12 p-1 text-blue-400 font-medium text-base bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue select-none"
                                                        type="button"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <button
                                                    onClick={() => (product ? addProducts(product, quantity) : '')}
                                                    type="button"
                                                    className="flex flex-row space-x-5 text-blue-500 bg-blue-100 border rounded shadow p-2"
                                                >
                                                    <div className="flex flex-row items-center">
                                                        <div className="inline-block">
                                                            <svg
                                                                tabIndex={-1}
                                                                className="w-6 h-6"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div>Add to cart</div>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex flex-row justify-between mt-4">
                                                <button
                                                    type="button"
                                                    className="flex flex-row text-xs space-x-4 px-6 py-2 items-center justify-center border rounded bg-blue-900"
                                                >
                                                    <div>
                                                        <svg
                                                            width="9"
                                                            height="17"
                                                            viewBox="0 0 9 17"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M0.333788 8.89243H2.09581V16.1529C2.09581 16.2217 2.12314 16.2877 2.17177 16.3363C2.2204 16.385 2.28635 16.4123 2.35512 16.4123H5.34355C5.41232 16.4123 5.47827 16.385 5.5269 16.3363C5.57553 16.2877 5.60286 16.2217 5.60286 16.1529V8.92646H7.6295C7.69305 8.92636 7.75436 8.90291 7.80177 8.86057C7.84918 8.81823 7.8794 8.75994 7.88669 8.69678L8.19488 6.02357C8.19907 5.98726 8.19556 5.95047 8.18455 5.91562C8.17354 5.88077 8.1553 5.84864 8.13102 5.82133C8.10674 5.79403 8.07696 5.77216 8.04365 5.75717C8.01033 5.74218 7.97422 5.7344 7.93769 5.73434H5.59966V4.05959C5.59966 3.55451 5.87174 3.29825 6.40736 3.29825H7.93344C8.00222 3.29825 8.06817 3.27091 8.1168 3.22226C8.16543 3.1736 8.19275 3.10761 8.19275 3.0388V0.585691C8.19333 0.517243 8.16684 0.451343 8.11907 0.402348C8.07129 0.353352 8.00609 0.325232 7.93769 0.324112L5.83241 0.324112H5.7357C4.76625 0.327535 3.83052 0.680516 3.10011 1.31833C2.75544 1.6197 2.49099 2.00202 2.33054 2.43094C2.17008 2.85986 2.11864 3.32195 2.18083 3.77568V5.7354H0.330593C0.26182 5.7354 0.195867 5.76274 0.147237 5.81139C0.0986075 5.86005 0.0712891 5.92604 0.0712891 5.99486V8.63298C0.0712865 8.66732 0.0780937 8.70132 0.0913241 8.73301C0.104555 8.7647 0.123947 8.79344 0.148364 8.81758C0.172782 8.84171 0.201742 8.86076 0.233572 8.87361C0.265402 8.88646 0.299468 8.89285 0.333788 8.89243Z"
                                                                fill="white"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="text text-white">Share on facebook</div>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="flex flex-row text-xs space-x-4 px-6 py-2 items-center justify-center border rounded bg-blue-400"
                                                >
                                                    <div>
                                                        <svg
                                                            width="18"
                                                            height="13"
                                                            viewBox="0 0 18 13"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M17.3627 1.53895C16.7128 1.79428 16.0254 1.96403 15.3218 2.04296C16.0636 1.64691 16.6184 1.01962 16.8808 0.279969C16.1871 0.650397 15.4281 0.911475 14.6368 1.05195C14.1512 0.584038 13.5203 0.25855 12.8264 0.117836C12.1325 -0.0228783 11.4076 0.0276939 10.7461 0.262973C10.0845 0.498253 9.51695 0.907345 9.11719 1.43702C8.71743 1.9667 8.504 2.59244 8.50466 3.23283C8.50207 3.47728 8.5298 3.72123 8.58733 3.96014C7.17787 3.89784 5.79888 3.56843 4.54051 2.99345C3.28213 2.41847 2.17271 1.61087 1.28477 0.623425C0.828755 1.32511 0.687516 2.15707 0.889905 2.94935C1.09229 3.74164 1.62304 4.43446 2.37372 4.8863C1.81304 4.8729 1.26417 4.73833 0.773367 4.49393V4.52902C0.774126 5.26513 1.05632 5.97857 1.57252 6.54942C2.08872 7.12028 2.80746 7.51375 3.60794 7.66371C3.30471 7.73611 2.99214 7.77187 2.67844 7.77004C2.4533 7.77372 2.22839 7.75554 2.00759 7.71581C2.23624 8.34844 2.67696 8.90178 3.26914 9.29973C3.86132 9.69769 4.57588 9.92072 5.31459 9.93816C4.06194 10.8193 2.51776 11.2977 0.928087 11.2971C0.644673 11.2989 0.361424 11.2843 0.0800781 11.2535C1.69952 12.1929 3.58651 12.69 5.51301 12.6847C6.83964 12.6931 8.15489 12.464 9.38236 12.0108C10.6098 11.5577 11.7251 10.8895 12.6633 10.045C13.6015 9.20052 14.344 8.19663 14.8476 7.09163C15.3512 5.98663 15.6059 4.80256 15.597 3.60818C15.597 3.46676 15.597 3.33065 15.584 3.19561C16.2839 2.74544 16.8867 2.18402 17.3627 1.53895Z"
                                                                fill="white"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="text text-white">Share on twitter</div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-10 bg-gray-100 border rounded w-full h-64">
                            <div className="flex flex-row items-center space-x-10 border-b-2 border-gray-200">
                                <button
                                    type="button"
                                    className="border-b-2 px-4 py-4 hover:border-blue-500 hover:text-blue-400"
                                >
                                    Product information
                                </button>
                                <button
                                    type="button"
                                    className="border-b-2 m-0 px-2 py-4 hover:border-blue-500 hover:text-blue-400"
                                >
                                    Reviews
                                </button>
                            </div>
                            <div>
                                <div className="w-3/4 mt-5 mx-4">{product?.description}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-12 sm:mt-0">
                        {sliderProductLeftDisplay ? (
                            <button type="button" onClick={sliderProductLeft}>
                                <div className="flex flex-col justify-center border rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white h-10 w-10">
                                    <svg
                                        className="w-10 h-10 p-2 flex flex-row content-center"
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
                                </div>
                            </button>
                        ) : (
                            ''
                        )}
                        <div className="w-60 border shadow border-gray-300 mx-4 flex flex-col">
                            <div className="w-60 h-48 flex flex-col justify-center">
                                <div className="flex flex-row justify-center">
                                    <img
                                        className="h-48 w-auto p-4"
                                        src={`${
                                            sliderProduct?.image?.filter((image) => image.default_img === true)[0].href
                                        }`}
                                        alt={`${sliderProduct?.title}`}
                                    />
                                </div>
                            </div>
                            <div className="border-t border-gray-300 h-36 flex flex-col justify-center">
                                <div className="flex flex-row justify-center">
                                    <div className="text-sm text-center font-semibold">{sliderProduct?.title}</div>
                                </div>
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
                        {sliderProductRightDisplay ? (
                            <button type="button" onClick={sliderProductRight}>
                                <div className="flex flex-col justify-center border rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white h-10 w-10">
                                    <svg
                                        className="w-10 h-10 p-2 flex flex-row content-center"
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
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
            <div className="mx-10 text-2xl mt-16 font-medium flex flex-row justify-center">
                <div>RELATED PRODUCTS</div>
            </div>
            <div className="flex flex-row items-center space-y-5 justify-center mt-10">
                {featureProductLeftDisplay ? (
                    <button type="button" onClick={featureProductLeft}>
                        <div className="flex flex-col justify-center border rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white h-10 w-10">
                            <svg
                                className="w-10 h-10 p-2 flex flex-row content-center"
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
                        </div>
                    </button>
                ) : (
                    ''
                )}
                <div className="flex flex-col sm:flex-row">
                    {featureProducts.map((elem) => (
                        <ul key={elem.id} className="w-60 border shadow border-gray-300 mx-4 mt-12 sm:mt-0">
                            <li className="w-60 h-48 flex flex-col justify-center">
                                <div className="flex flex-row justify-center">
                                    <img
                                        className="h-48 w-auto p-4"
                                        src={`${elem.image?.filter((image) => image.default_img === true)[0].href}`}
                                        alt={`${elem.title}`}
                                    />
                                </div>
                            </li>
                            <li className="border-t border-gray-300 h-36 flex flex-col justify-center">
                                <div className="flex flex-row justify-center">
                                    <div className="text-sm text-center font-semibold">{elem.title}</div>
                                </div>
                                <div className="flex flex-row justify-center mt-1">
                                    <div className="text-xs">Rating</div>
                                </div>
                                {elem.discount && elem.discount > 0 ? (
                                    <div className="flex flex-row justify-center space-x-5 mt-1">
                                        <div className="text-blue-400">{elem.price * (1 - elem.discount * 0.01)}</div>
                                        <div className="line-through">{elem.price}</div>
                                        <div className="text-red-800">{elem.discount}</div>
                                    </div>
                                ) : (
                                    <div className="flex flex-row justify-center space-x-5 mt-1 mb-1">
                                        <div className="text-blue-400">€{elem.price}</div>
                                    </div>
                                )}
                            </li>
                        </ul>
                    ))}
                </div>
                {featureProductRightDisplay ? (
                    <button type="button" onClick={featureProductRight}>
                        <div className="flex flex-col justify-center border rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white h-10 w-10">
                            <svg
                                className="w-10 h-10 p-2 flex flex-row content-center"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default Product;