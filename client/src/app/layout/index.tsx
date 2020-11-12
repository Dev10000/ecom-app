import React from 'react';
import Header from './header';
import Footer from './footer';

interface ILayoutProps {
    children: React.ReactElement;
}

const Layout: React.FC<ILayoutProps> = ({ children }): JSX.Element => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
