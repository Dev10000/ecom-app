import React from 'react';

const Featured: React.FC = (): JSX.Element => {
    return (
        <div className="flex max-w-screen mt-1">
            <div className="w-full dark:bg-gray-800 text-xs flex flex-row justify-between p-16">
                <div className="flex flex-cols-2 gap-4 w-58">
                    <div className="flex items-left w-24">
                        <img
                            className="w-96 h-54"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="Lorem ipsum"
                        />
                    </div>
                    <div className="w-32">
                        <h2 className="font-bold mb-1 mb-2">
                            Blue Swade Nike <br /> Sneakers
                        </h2>
                        <div>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                        </div>
                        <div className="float-left mt-4">
                            <span>$ 499 </span>
                            <span className="line-through grey-300">$ 599</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-cols-2 gap-4 w-58">
                    <div className="flex items-left w-24">
                        <img
                            className="w-96 h-54"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="Lorem ipsum"
                        />
                    </div>
                    <div className="w-32">
                        <h2 className="font-bold mb-1 mb-2">
                            Blue Swade Nike <br /> Sneakers
                        </h2>
                        <div>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                        </div>
                        <div className="float-left mt-4">
                            <span>$ 499 </span>
                            <span className="line-through grey-300">$ 599</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-cols-2 gap-4 w-58">
                    <div className="flex items-left w-24">
                        <img
                            className="w-96 h-54"
                            src="https://via.placeholder.com/250x150?text=Product Image"
                            alt="Lorem ipsum"
                        />
                    </div>
                    <div className="w-32">
                        <h2 className="font-bold mb-1 mb-2">
                            Blue Swade Nike <br /> Sneakers
                        </h2>
                        <div>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                            <svg
                                className="float-left"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill="#4B5563"
                                    d="M9.04893 2.92707C9.34828 2.00576 10.6517 2.00576 10.951 2.92707L12.0206 6.21886C12.1545 6.63089 12.5384 6.90985 12.9717 6.90985H16.4329C17.4016 6.90985 17.8044 8.14946 17.0207 8.71886L14.2205 10.7533C13.87 11.0079 13.7233 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.3879 16.2812L10.5878 14.2467C10.2373 13.9921 9.76269 13.9921 9.4122 14.2467L6.61203 16.2812C5.82832 16.8506 4.77384 16.0844 5.07319 15.1631L6.14276 11.8713C6.27663 11.4593 6.12997 11.0079 5.77949 10.7533L2.97932 8.71886C2.1956 8.14946 2.59838 6.90985 3.5671 6.90985H7.0283C7.46153 6.90985 7.84548 6.63089 7.97936 6.21886L9.04893 2.92707Z"
                                />
                            </svg>
                        </div>
                        <div className="float-left mt-4">
                            <span>$ 499 </span>
                            <span className="line-through grey-300">$ 599</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
