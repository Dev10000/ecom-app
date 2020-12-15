/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const [search, setSearch] = useState(pathname.slice(8));
    const [resultNo, setResultNo] = useState(0);

    const [categoryFilter, setCategoryFilter] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [perPage, setPerPage] = useState(24);

    // get the total number of results for pagination
    useEffect(() => {
        const apiEndpoint = !search ? `products/count` : `products/search/${search}/count`;
        axios.get(apiEndpoint).then((res) => {
            const calculatedLastPage = Math.ceil(Number(res.data.data) / perPage);
            setResultNo(Number(res.data.data));
            setLastPage(calculatedLastPage);
            setCurrentPage(1);
        });
    }, [perPage, search]);

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        const keywords = searchInput.current?.value;
        if (keywords?.trim() !== '') history.push(`/search/${keywords}`);
        else history.push('/');
        setSearch(keywords || '');
    };

    // get the products
    useEffect(() => {
        const apiCall = !search
            ? `products?page=${currentPage}&items=${perPage}`
            : `products/search/${search}/?page=${currentPage}&items=${perPage}`;
        axios
            .get(apiCall)
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, [currentPage, perPage, search]);

    const previousPage = () => {
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage <= lastPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const pageLinks = () => {
        if (lastPage < 10) return [...Array(lastPage)].map((_e, index) => index + 1);
        if (currentPage < 6) return [...Array(10)].map((_e, index) => index + 1);
        if (currentPage > lastPage - 6) {
            const arr = [];
            for (let i = lastPage - 9; i <= lastPage; i++) {
                arr.push(i);
            }
            return arr;
        }
        return [
            currentPage - 5,
            currentPage - 4,
            currentPage - 3,
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
            currentPage + 3,
            currentPage + 4,
        ];
    };

    return (
        <div className="flex flex-col justify-center">
            <Hero />
            <div className="flex flex-col" />
            {/* <div>
                <div className="mt-20 text-center font-medium text-2xl">MAIN CATEGORIES</div>

                <ul className="text-base space-x-4 text-center items-center flex flex-row list-none justify-center">
                    <button type="button" className="text hover:text-blue-400" onClick={() => setCategoryFilter(0)}>
                        All
                    </button>
                    {categories
                        .filter((_category, index) => index < 4)
                        .map((category) => (
                            <li key={category.id} className="mx-4">
                                <button
                                    type="button"
                                    className="text hover:text-blue-400"
                                    onClick={() => setCategoryFilter(category.id)}
                                >
                                    {category.title}
                                </button>
                            </li>
                        ))}
                </ul>
            </div> */}
            <div className="w-full text-center">
                <form className="text-base mt-10" onSubmit={handleSearch}>
                    <input
                        id="search"
                        ref={searchInput}
                        defaultValue={search}
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
                {products.map((product) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Product key={product.id} {...product} />
                ))}
            </div>

            {/* pagination stuff */}
            <div className="w-full flex justify-between p-16">
                <div>
                    <button
                        className={`p-3 border rounded shadow ${
                            currentPage === 1
                                ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed text-gray-600'
                                : 'bg-gray-200 hover:bg-gray-100'
                        }`}
                        type="button"
                        onClick={previousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageLinks().map((p) => {
                        return (
                            <button
                                key={`page-${p}`}
                                className={`p-3 bg-gray-200 border rounded shadow hover:bg-gray-100 ${
                                    p === currentPage ? 'bg-blue-400 text-white hover:bg-blue-500' : null
                                }`}
                                type="button"
                                onClick={() => setCurrentPage(p)}
                            >
                                {p}
                            </button>
                        );
                    })}
                    <button
                        className={`p-3 border rounded shadow ${
                            currentPage === lastPage
                                ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed text-gray-600'
                                : 'bg-gray-200 hover:bg-gray-100'
                        }`}
                        type="button"
                        onClick={nextPage}
                        disabled={currentPage === lastPage}
                    >
                        Next
                    </button>
                    <span className="ml-3">
                        <b>{lastPage}</b> page(s) in total / {resultNo} results
                    </span>
                </div>

                <select
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="p-3 border"
                    name="perPage"
                    id="perPage"
                >
                    <option value="" disabled>
                        Per Page
                    </option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                    <option value={96}>96</option>
                </select>
            </div>
            <Hero2 />
            <StoreFeatures />
            <News />
            <Featured />
        </div>
    );
};

export default Home;
