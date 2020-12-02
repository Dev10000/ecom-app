import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories: React.FC = (): JSX.Element => {
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
        <div>
            <div className="mt-40 text-center font-medium text-2xl">BEST SELLER</div>
            <div className="w-full mt-6">
                <div className="text-base space-x-4 text-center items-center flex flex-row bg-white list-none justify-center">
                    <div>
                        <button type="button" className="text-blue-400">
                            All
                        </button>
                    </div>
                    <div>
                        <ul className="flex flex-row">
                            {categories
                                .filter((category, index) => index < 4)
                                .map((category) => (
                                    <li key={category.id} className="mx-4">
                                        <button type="button" className="text hover:text-bg-400">
                                            {category.title}
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
