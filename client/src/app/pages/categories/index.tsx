/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<IProductCategory[]>([]);
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

    return (
        <div className="font-poppins flex flex-col items-center text-base mt-10">
            <div className="bg-gray-100 w-screen">
                <div className="flex items-center text-sm p-2">
                    <span className="text-blue-600">
                        <NavLink to="/">Home</NavLink>
                    </span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-blue-600 mx-1">
                        <NavLink to="/categories">Categories</NavLink>{' '}
                    </span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-blue-600 mx-1">
                        <NavLink to="/categories">Bags</NavLink>{' '}
                    </span>
                </div>
            </div>

            <div className="w-full flex flex-row ml-16 mt-10">
                <div className=" p-2 w-56 mx-2 my-2 flex flex-col">
                    <div className="bg-gray-300 border rounded p-4 text-sm">
                        <ul>
                            {categories
                                .filter((category, index) => index < 8)
                                .map((category) => (
                                    <li className="mt-4 flex justify-between">
                                        <li>
                                            <NavLink
                                                className="text hover:text-bg-400"
                                                to={`/categories/${category.id}`}
                                            >
                                                {category.title}
                                            </NavLink>
                                        </li>
                                        <li>1</li>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="border rounded bg-gray-300 h-96 mt-10">Popular categories</div>
                    <button type="button" className="border rounded bg-gray-300 mt-10">
                        Show more
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-full mt-4 h-48 border border-gray-400 bg-blue-400 border rounded">
                        Add image and text
                    </div>
                    <div className="w-full mt-4 h-16 bg-gray-300">Sort and display options</div>
                    <div className="grid gap-6 grid-cols-3 mt-4">
                        {categories.map((category) => (
                            <NavLink className="border border-gray-400 rounded" to={`/categories/${category.id}`}>
                                <div className=" w-84 flex flex-col items-center">
                                    <img
                                        className="border object-cover"
                                        src="../assets/thumbnails/nike_red.jpeg"
                                        alt="Shoes"
                                    />
                                    <div className="text-base">{category.title}</div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
