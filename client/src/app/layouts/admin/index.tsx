import React from 'react';

interface ILayoutProps {
    children: React.ReactElement;
}

const AdminLayout: React.FC<ILayoutProps> = ({ children }): JSX.Element => {
    return <div className="relative bg-green-200 dark:bg-gray-900 dark:text-white">{children}</div>;
};

export default AdminLayout;
