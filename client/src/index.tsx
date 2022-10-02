import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './app';

// import styles
import './assets/styles.css';

// axios.defaults.baseURL = 'https://app3.dev100.xyz/api';
// Test
axios.defaults.baseURL = '/api';

let AUTH_TOKEN = localStorage.getItem('token');

if (AUTH_TOKEN) {
    AUTH_TOKEN = JSON.parse(AUTH_TOKEN);
    axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
