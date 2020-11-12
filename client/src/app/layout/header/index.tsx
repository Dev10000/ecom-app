import React from 'react';
import OldHeader from '../../../components/Header';
import TopMenu from '../../../components/TopMenu';

export default function Header(): JSX.Element {
    return (
        <div>
            <OldHeader />
            <TopMenu />
        </div>
    );
}
