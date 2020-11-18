import React from 'react';
import { NavLink } from 'react-router-dom';

interface IRoutes {
    path: string;
    name: string;
    Component: React.FC;
}

interface IBreadcrumbsProps {
    routes: IRoutes[];
}

const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ routes }): JSX.Element => {
    console.log(routes);

    return (
        <div className="bg-gray-100 w-full">
            <div className="flex items-center text-sm py-2 px-4">
                <span className="text-blue-600 cursor-pointer">
                    <NavLink to="/">Home</NavLink>
                </span>
                <span className="text-gray-400 mx-1">/</span>
                {/* <span className="text-gray-600 mx-1">{`path: ${path} and name:${name}`}</span> */}
            </div>
        </div>
    );
};

export default Breadcrumbs;
