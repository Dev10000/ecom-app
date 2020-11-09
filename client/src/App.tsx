import React from 'react';
import Header from './components/Header';
import Router from './components/Router';
import TopMenu from './components/TopMenu';

function App(): JSX.Element {
    // useEffect(() => {
    //     fetch('https://fakestoreapi.com/products?limit=45')
    //         .then((res) => res.json())
    //         .then((json) => console.log(json));
    // }, []);

    return (
        <div className="relative p-4 text-xl">
            <Header />
            <TopMenu />
            <Router />
        </div>
    );
}

export default App;
