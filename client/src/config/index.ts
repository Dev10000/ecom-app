import axios from 'axios';

const AUTH_TOKEN = ''; // get this from the server and store it the localstorage'

axios.defaults.baseURL = 'http://localhost:500/api';
axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
