import React from 'react';
import Layout from './layout';
import Router from './router';

function App(): JSX.Element {
    return (
        <Layout>
            <Router />
        </Layout>
    );
}

export default App;
