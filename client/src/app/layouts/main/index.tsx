import React from 'react';
import Header from './header';
import Footer from './footer';

interface ILayoutProps {
    children: React.ReactElement;
}

const MainLayout: React.FC<ILayoutProps> = ({ children }): JSX.Element => {
    return (
        <div className="relative bg-white dark:bg-gray-900 dark:text-white">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default MainLayout;
