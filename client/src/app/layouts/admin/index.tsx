import React from 'react';
import Sidebar from './sidebar';

interface ILayoutProps {
    children: React.ReactElement;
}

const AdminLayout: React.FC<ILayoutProps> = ({ children }): JSX.Element => {
    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            <Sidebar />
            {children}
        </div>
    );
};

export default AdminLayout;
