/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import categories from '../../../../../utils/top_categories.json';

interface ICategoryDropdownProps {
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryDropdown: React.FC<ICategoryDropdownProps> = ({ setDisplay }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Esc') {
                setDisplay(false);
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [setDisplay]);

    return (
        <>
            <button
                type="button"
                className="fixed inset-0 h-full w-full cursor-default focus:outline-none"
                onClick={() => setDisplay(false)}
                tabIndex={-1}
            />
            <div className="absolute z-20 right-0 mr-12 mt-3 px-2 w-full max-w-xl sm:px-0 lg:max-w-4xl">
                <div className="rounded-lg bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
                    <div className="relative grid gap-4 px-3 py-3 lg:gap-3 sm:p-8 md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <button key={category.id} type="button" onClick={() => setDisplay(false)}>
                                <NavLink
                                    className="p-2 flex items-start rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 transition ease-in-out duration-150 text-sm whitespace-nowrap"
                                    activeClassName="bg-gray-100"
                                    to={`/categories/${category.slug}`}
                                >
                                    {category.title}
                                </NavLink>
                            </button>
                        ))}
                    </div>
                    <div className="text-sm mb-6 w-full text-center">
                        <button
                            type="button"
                            className="py-2 px-4 text-md border rounded bg-blue-500 hover:bg-blue-700 text-white shadow-md select-none focus:outline-none transition ease-in-out duration-150"
                            onClick={() => setDisplay(false)}
                        >
                            <NavLink to="/categories">All categories</NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryDropdown;
