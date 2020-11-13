import React from 'react';
import Header from './header';
import Footer from './footer';

interface ILayoutProps {
    children: React.ReactElement;
}

const Layout: React.FC<ILayoutProps> = ({ children }): JSX.Element => {
    return (
        <div className="relative">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
