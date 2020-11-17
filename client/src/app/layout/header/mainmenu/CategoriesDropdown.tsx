import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

interface IProps {
    action: () => void;
}
const CategoryDropdown: React.FC<IProps> = (props: IProps) => {
    const { action } = props;
    const [categories, setCategories] = useState<IProductCategory[]>([]);
    const [more, setMore] = useState<number>(24);
    const handleMore = () => {
        if (more < categories.length) {
            setMore(more + 6);
        }
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
    return (
        <div className="flex flex-col items-center z-30 bg-white">
            <div className="text-sm hover:text-white mt-4">
                <button
                    type="button"
                    className="inline-flex block px-2 py-1 items-center text-md border rounded border-gray-400 bg-blue-500 hover:bg-blue-700 text-white hover:shadow-md select-none focus:outline-none transition ease-in-out duration-150"
                    onClick={action}
                >
                    <NavLink className="hover:text-blue-500" to="/categories">
                        All categories
                    </NavLink>
                </button>
            </div>
            <div className="grid gap-y-4 gap-x-16 grid-cols-6 text-sm bg-white items-center list-none px-32 py-14">
                {categories
                    .filter((category, index) => index < more)
                    .map((category) => (
                        <li className="mt-4 flex justify-between">
                            <button type="button" onClick={action}>
                                <NavLink className="text hover:text-blue-400" to={`/categories/${category.id}`}>
                                    {category.title}
                                </NavLink>
                            </button>
                        </li>
                    ))}
            </div>
            <div className="mb-5 text-sm">
                <button
                    className="inline-flex px-2 py-1 items-center text-md border rounded border-gray-400 bg-blue-500 hover:bg-blue-700 text-white hover:shadow-md select-none focus:outline-none transition ease-in-out duration-150"
                    type="button"
                    onClick={handleMore}
                >
                    More +
                </button>
            </div>
        </div>
    );
};

export default CategoryDropdown;
