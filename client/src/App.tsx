import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Router from './components/Router';

function App(): JSX.Element {
    return (
        <div className="p-4 text-xl">
            <Header />
            <Hero />
            <Router />
        </div>
    );
}

export default App;
