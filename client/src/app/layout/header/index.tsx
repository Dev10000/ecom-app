import React from 'react';
import TopNav from './topnav';
import MainMenu from './mainmenu';

export default function Header(): JSX.Element {
    return (
        <>
            <TopNav />
            <MainMenu />
        </>
    );
}
