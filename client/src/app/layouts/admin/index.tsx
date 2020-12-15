import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import MobileSidebar from './sidebar/mobile';
import DesktopSidebar from './sidebar/desktop';
import Navbar from './navbar';

interface ILayoutProps {
    children: React.ReactElement;
}

const AdminLayout: React.FC<ILayoutProps> = ({ children }): JSX.Element => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <div className="h-screen flex overflow-hidden flex-shrink-0 bg-gray-100">
            {/* Overlay */}
            <Transition
                show={sidebarVisible}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <button
                    type="button"
                    className="lg:hidden fixed z-40 inset-0 h-full w-full cursor-default focus:outline-none ml-64"
                    onClick={() => setSidebarVisible(false)}
                    tabIndex={-1}
                >
                    <div className="absolute inset-0 bg-gray-700 opacity-75" />
                </button>
            </Transition>

            {/* Mobile Sidebar */}
            <Transition
                show={sidebarVisible}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                <MobileSidebar setSidebarVisible={setSidebarVisible} />
            </Transition>

            <DesktopSidebar />
            <div className="w-full flex flex-col flex-grow overflow-hidden">
                <Navbar setSidebarVisible={setSidebarVisible} />
                <main className="mt-16 flex-1 relative pb-8 z-0 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
