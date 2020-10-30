import React from 'react';
import TopMenu from '../TopMenu';

const Header: React.FC = (): JSX.Element => {
    return (
        <div>
            <div>Header Component </div>
            <TopMenu />
        </div>
    );
};

export default Header;
