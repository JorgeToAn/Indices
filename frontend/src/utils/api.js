import axios from 'axios';
import { API_BASE_URL } from './constants';

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'es',
  },
});

export default API;