import React from 'react';
// import { NavLink } from 'react-router-dom';
import topCategories from '../../../../utils/top_categories.json';
import allCategories from '../../../../utils/all_categories.json';

function buildTreeFor(parentId: number) {
    const subcategories = allCategories.filter((subcategories) => {
        subcategory.parent_id === parent_id;
    });
}

const Categories: React.FC = (): JSX.Element => {
    return (
        <div>
            {topCategories.map((topCategory) => (
                <ul key={topCategory.id}>
                    <li className="font-bold">{topCategory.title}</li>
                </ul>
            ))}
        </div>
    );
};

export default Categories;
