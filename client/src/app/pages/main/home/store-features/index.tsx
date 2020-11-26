import React from 'react';

const StoreFeatures: React.FC = (): JSX.Element => {
    return (
        <div className="flex max-w-screen mt-8">
            <div className="flex-cols-3 w-full m-4 sm:flex flex-row justify-between w-full text-xs p-16">
                <div className="flex flex-col w-48 sm:w-96 md:w-96">
                    <div className="flex items-center">
                        <svg
                            className="w-20 h-16 mr-auto ml-auto display-block"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 102 67"
                        >
                            <path
                                d="M101.405 34.414v-.057a2.304 2.304 0 00-2.315-2.275h-.609l-9.411-18.18a2.311 2.311 0 00-2.062-1.245H70.95l.612-4.857A6.599 6.599 0 0064.91.493H15.07a2.463 2.463 0 00-2.438 2.22l-.503 4h28.4a3.236 3.236 0 013.251 3.34 3.446 3.446 0 01-3.426 3.34h-9.471v.013H3.073a2.437 2.437 0 00-2.422 2.357 2.288 2.288 0 002.3 2.364h36.823a3.461 3.461 0 012.939 3.531 3.692 3.692 0 01-3.646 3.576H13.685a2.462 2.462 0 00-2.447 2.388 2.311 2.311 0 002.322 2.39h25.088a3.461 3.461 0 012.987 3.527 3.692 3.692 0 01-3.67 3.577H6.767a2.462 2.462 0 00-2.448 2.388 2.31 2.31 0 002.322 2.389h2.087l-.816 8.541a6.599 6.599 0 006.652 7.306h1.802a10.404 10.404 0 0010.295 8.613 11.106 11.106 0 0010.745-8.613h22.468a7.612 7.612 0 004.885-1.832 6.64 6.64 0 004.652 1.832h.37a10.403 10.403 0 0010.295 8.613A11.106 11.106 0 0090.82 57.74h1.48a7.833 7.833 0 007.637-7.001l1.454-16.093v-.065c0-.023.006-.065.007-.1.001-.033.006-.048.006-.067zM26.785 61.58a5.783 5.783 0 01-5.805-5.962 6.16 6.16 0 016.117-5.962 5.78 5.78 0 015.806 5.962 6.16 6.16 0 01-6.118 5.962zm53.418 0a5.783 5.783 0 01-5.806-5.962 6.16 6.16 0 016.117-5.962 5.781 5.781 0 015.806 5.962 6.16 6.16 0 01-6.117 5.962zm14.99-11.15a2.872 2.872 0 01-2.767 2.536h-1.599a10.405 10.405 0 00-10.183-8.08 11.108 11.108 0 00-10.61 8.08h-.492a2.025 2.025 0 01-1.524-.64 2.053 2.053 0 01-.503-1.591l3.007-33.316h6.906l-1.094 12.132a6.6 6.6 0 006.652 7.307h13.43l-1.224 13.571z"
                                fill="#FF6875"
                            />
                        </svg>
                    </div>
                    <div className="mt-6 dark:text-white">
                        <div className="font-semibold mb-4 text-center tracking-widest text-lg">FREE SHIPPING</div>
                        <div className="text-center mb-4">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry standard dummy text ever.Since the 1500s, when an unknown printer.
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-48 sm:w-96 md:w-96">
                    <div className="flex items-center">
                        <svg
                            className="w-20 h-16 mr-auto ml-auto display-block"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 70 79"
                        >
                            <path
                                d="M56.284 16.803l-3.772 4.844a28.287 28.287 0 11-15.782-5.888l-5.306 5.567 3.936 3.757 8.377-8.8 3.753-3.942L43.56 8.6 34.766.222 31.01 4.163l5.728 5.456a34.398 34.398 0 00-6.904 68.344c1.792.284 3.604.426 5.42.426a34.413 34.413 0 0021.03-61.586z"
                                fill="#FF6875"
                            />
                        </svg>
                    </div>
                    <div className="mt-6 dark:text-white">
                        <div className="font-semibold mb-4 text-center tracking-widest text-lg">100% REFUND</div>
                        <div className="text-center mb-4">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry standard dummy text ever.Since the 1500s, when an unknown printer.
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-48 sm:w-96 md:w-96">
                    <div className="flex items-center">
                        <svg
                            className="w-20 h-16 mr-auto ml-auto display-block"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 69 90"
                        >
                            <path
                                d="M.724 70.495V89.06H68.39V70.495a7.817 7.817 0 00-7.807-7.808H8.531a7.818 7.818 0 00-7.807 7.808zm5.204 0a2.606 2.606 0 012.603-2.603h2.602V83.86H5.928V70.495zm10.411-2.603h6.73l11.488 11.489 11.489-11.489h6.726V83.86H16.339V67.892zm46.847 2.603v13.36h-5.204V67.888h2.602a2.606 2.606 0 012.602 2.607zm-24.501-2.603l-4.128 4.128-4.127-4.128h8.255z"
                                fill="#FF6875"
                            />
                            <path
                                d="M54.029 52.273h3.956v-5.205h2.603a7.817 7.817 0 007.807-7.807v-5.205a33.836 33.836 0 00-67.671.003v5.204a7.817 7.817 0 007.807 7.808h3.942a23.415 23.415 0 0041.556 5.202zm6.559-10.41h-2.754c.097-.865.146-1.734.146-2.603v-5.205c0-.87-.049-1.739-.145-2.603h2.748a2.606 2.606 0 012.602 2.603v5.205a2.606 2.606 0 01-2.602 2.607l.005-.005zM34.558 5.43a28.68 28.68 0 0127.589 20.979 7.811 7.811 0 00-1.563-.158H56.64a23.424 23.424 0 00-44.167 0H8.531c-.525 0-1.049.053-1.563.158a28.68 28.68 0 0127.59-20.98zm14.945 18.224a18.291 18.291 0 01-14.946 7.802H16.525a18.212 18.212 0 0132.978-7.802zM8.531 41.867a2.606 2.606 0 01-2.603-2.602V34.06a2.606 2.606 0 012.603-2.603h2.753a23.4 23.4 0 00-.146 2.603v5.205c0 .87.05 1.738.146 2.602H8.531zm7.807-2.602v-2.603h18.22a23.51 23.51 0 0017.46-7.814c.505 1.69.761 3.446.76 5.21v5.205a18.113 18.113 0 01-1.76 7.808h-8.653l-2.291-2.286a7.808 7.808 0 01-11.042 0l-3.68 3.68a13.014 13.014 0 0017.009 1.21v2.598h4.928a18.209 18.209 0 01-30.95-13.01v.002z"
                                fill="#FF6875"
                            />
                        </svg>
                    </div>
                    <div className="mt-6 dark:text-white">
                        <div className="font-semibold mb-4 text-center tracking-widest text-lg">SUPPORT 24/7</div>
                        <div className="text-center mb-4">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry standard dummy text ever.Since the 1500s, when an unknown printer.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreFeatures;
