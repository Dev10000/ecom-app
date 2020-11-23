import React from 'react';
import Sidebar from '.';

const DesktopSidebar: React.FC = (): JSX.Element => {
    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex flex-col h-screen flex-grow bg-gray-300 pt-5 pb-4 overflow-y-auto">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default DesktopSidebar;
