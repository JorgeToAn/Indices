import axios from 'axios';
import { API_BASE_URL } from './constants';
import Cookies from 'js-cookie';

const token = Cookies.get('access_token');
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'es',
    'Authorization': `Bearer ${token}`,
  },
});

export default API;