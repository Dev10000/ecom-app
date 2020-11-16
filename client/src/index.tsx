import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './app';

const AUTH_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMCwiZW1haWwiOiJhbmdlbGluLmNhbHVAZ21haWwuY29tIiwiaWF0IjoxNjA1NTE0MTg1LCJleHAiOjE2MDU2MDA1ODV9.tHoFPNYC31JsUPV_SmtBGXPKrltcueiXpA3xwd8AL9U'; // get this from the server and store it the localstorage'

axios.defaults.baseURL = 'http://localhost:500/api';
axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
