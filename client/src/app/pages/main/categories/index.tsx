/* eslint-disable camelcase */
import React from 'react';
// import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import topCategories from '../../../../utils/top_categories.json';
import allCategories from '../../../../utils/all_categories.json';

function categoryTree(parentId: number, level = 0): JSX.Element {
    const subcategories = allCategories.filter((currentCategory) => currentCategory.parent_id === parentId);

    return subcategories.length ? (
        <ul className="ml-4">
            {subcategories.map((subcategory) => {
                return (
                    <>
                        <li key={subcategory.id} className="hover:underline">
                            <NavLink to={`categories/${subcategory.slug}`}>{subcategory.title}</NavLink>
                        </li>
                        {categoryTree(subcategory.id, (level += 1))}
                    </>
                );
            })}
        </ul>
    ) : (
        <></>
    );
}

const Categories: React.FC = (): JSX.Element => {
    return (
        <div className="ml-8">
            <h1 className="text-2xl my-8">All Categories</h1>
            {topCategories.map((topCategory) => (
                <ul key={topCategory.id}>
                    <li className="font-bold mt-4">{topCategory.title}</li>
                    <li className="inline-flex">{categoryTree(topCategory.id)}</li>
                </ul>
            ))}
        </div>
    );
};

export default Categories;
