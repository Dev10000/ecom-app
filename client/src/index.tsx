import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './app';

// import styles
import './assets/styles.css';

axios.defaults.baseURL = 'http://localhost:5000/api';

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
