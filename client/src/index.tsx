import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './app';

const AUTH_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMCwiZW1haWwiOiJhbmdlbGluLmNhbHVAZ21haWwuY29tIiwiaWF0IjoxNjA1Mjc0ODUyLCJleHAiOjE2MDUzNjEyNTJ9.J5FJCWNjin6K-7my1pdTUm9nxCdKdUxPu0OLJjHt6do';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
