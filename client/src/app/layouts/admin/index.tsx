import React from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';

interface ILayoutProps {
    children: React.ReactElement;
}

const AdminLayout: React.FC<ILayoutProps> = ({ children }): JSX.Element => {
    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            <Sidebar />
            <div className="w-full flex flex-col">
                <Navbar />
                <main className="flex-1 relative pb-8 z-0 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
