import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Router from './components/Router';

function App(): JSX.Element {
    // useEffect(() => {
    //     fetch('https://fakestoreapi.com/products?limit=45')
    //         .then((res) => res.json())
    //         .then((json) => console.log(json));
    // }, []);

    return (
        <div className="p-4 text-xl">
            <Header />
            <Hero />
            <Router />
        </div>
    );
}

export default App;
