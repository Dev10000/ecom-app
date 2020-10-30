import React from 'react';
import { NavLink } from 'react-router-dom';

const TopMenu: React.FC = (): JSX.Element => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </nav>
    );
};

export default TopMenu;
