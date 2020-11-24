/* eslint-disable no-nested-ternary */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../../../ui/components/product';
import Featured from './featured';
import Hero from './hero';
import Hero2 from './hero2';
import News from './news';
import StoreFeatures from './store-features';
import Search from './search';

const Home: React.FC = (): JSX.Element => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<IProductCategory[]>([]);

    const handleAll = () => {
        setCategoryProducts(products);
    };

    const handleCategory = (id: number | undefined) => {
        setCategoryProducts(products.filter((product) => product.product_category_id === id));
        // console.log(categoryProducts.map((product) => product.product_category_id));
        // console.log(id);
    };
    useEffect(() => {
        axios
            .get('categories')
            .then((response) => {
                setCategories(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    useEffect(() => {
        axios
            .get('products')
            .then((response) => {
                setProducts(response.data.data);
                setCategoryProducts(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    return (
        <div className="flex flex-col justify-center">
            <Hero />
            <div className="flex flex-col" />
            <div>
                <div className="mt-20 text-center font-medium text-2xl">BEST SELLER</div>

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
            <div className="grid lg:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 px-10">
                {categoryProducts.map((product) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Product key={product.id} {...product} />
                ))}
            </div>
            <Hero2 />
            <StoreFeatures />
            <News />
            <Featured />
            <Search />
        </div>
    );
};

export default Home;
