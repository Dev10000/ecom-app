/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

import Hero from './hero';
import Product from '../../../../ui/components/product';
import StoreFeatures from './store-features';
import News from './news';
import Featured from './featured';

import Hero2 from './hero2';

import categories from '../../../../utils/top_categories.json';

const Home: React.FC = (): JSX.Element => {
    const { pathname } = useLocation();
    const history = useHistory();
    const searchInput = useRef<HTMLInputElement>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([]);

    // get all products or products including given search keywords
    const getProducts = (keywords?: string) => {
        const apiCall = !keywords ? 'products' : `products/search/${keywords}`;
        axios
            .get(apiCall)
            .then((response) => {
                setProducts(response.data.data);
                setCategoryProducts(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    };

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        const keywords = searchInput.current?.value;
        if (keywords?.trim() !== '') history.push(`/search/${keywords}`);
        else history.push('/');
        getProducts(keywords);
    };

    const handleAll = () => {
        setCategoryProducts(products);
    };

    const handleCategory = (id: number | undefined) => {
        setCategoryProducts(products.filter((product) => product.product_category_id === id));
    };

    const searchKeywords = pathname.slice(8);

    useEffect(() => {
        getProducts(searchKeywords); // search from current URL
    }, [searchKeywords]);

    return (
        <div className="flex flex-col justify-center">
            <Hero />
            <div className="flex flex-col" />
            <div>
                <div className="mt-20 text-center font-medium text-2xl">MAIN CATEGORIES</div>

                <ul className="text-base space-x-4 text-center items-center flex flex-row list-none justify-center">
                    <button type="button" className="text hover:text-blue-400" onClick={handleAll}>
                        All
                    </button>
                    {categories
                        .filter((_category, index) => index < 4)
                        .map((category) => (
                            <li key={category.id} className="mx-4">
                                <button
                                    type="button"
                                    className="text hover:text-blue-400"
                                    onClick={() => handleCategory(category.id)}
                                >
                                    {category.title}
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
            <div className="w-full text-center">
                <form className="text-base mt-10" onSubmit={handleSearch}>
                    <input
                        id="search"
                        ref={searchInput}
                        defaultValue={searchKeywords}
                        placeholder="Search products..."
                        className="border rounded-l-md border-gray-400 p-3 text-md focus:outline-none "
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="inline-flex -mx-1 px-4 py-3 items-center text-md border rounded-r-md border-gray-400 bg-blue-400 hover:bg-blue-500 text-white hover:shadow-md select-none focus:outline-none transition ease-in-out duration-150"
                    >
                        Search
                    </button>
                </form>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 px-10">
                {categoryProducts.map((product) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Product key={product.id} {...product} />
                ))}
            </div>
            <Hero2 />
            <StoreFeatures />
            <News />
            <Featured />
        </div>
    );
};

export default Home;
