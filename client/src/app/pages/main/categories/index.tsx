/* eslint-disable camelcase */
import React from 'react';
// import { NavLink } from 'react-router-dom';
import topCategories from '../../../../utils/top_categories.json';
import allCategories from '../../../../utils/all_categories.json';

function categoryTree(parentId: number, level = 0): JSX.Element {
    return (
        <ul>
            {allCategories
                .filter((currentCategory) => currentCategory.parent_id === parentId)
                .map((subcategory) => {
                    return (
                        <>
                            <li key={subcategory.id}>{subcategory.title}</li>
                            <li className="inline-flex">
                                <span>{'-'.repeat(level)}</span> {categoryTree(subcategory.id, (level += 1))}
                            </li>
                        </>
                    );
                })}
        </ul>
    );
}

const Categories: React.FC = (): JSX.Element => {
    return (
        <div>
            {topCategories.map((topCategory) => (
                <ul key={topCategory.id}>
                    <li className="font-bold">{topCategory.title}</li>
                    <li className="inline-flex">{categoryTree(topCategory.id)}</li>
                </ul>
            ))}
        </div>
    );
};

export default Categories;
