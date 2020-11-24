import React from 'react';
import Sidebar from '.';

interface IMobileSidebarProps {
    setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileSidebar: React.FC<IMobileSidebarProps> = ({ setSidebarVisible }): JSX.Element => {
    return (
        <div className="relative lg:hidden h-screen pt-5 z-50 flex-1 flex flex-col w-64 bg-gray-300">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                    type="button"
                    onClick={() => setSidebarVisible(false)}
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                    <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <Sidebar />
        </div>
    );
};

export default MobileSidebar;
