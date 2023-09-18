import axios from 'axios';

const newRequest = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/',
  baseURL: 'https://jobjuggle.onrender.com/api',
  withCredentials: true,
});

export default newRequest;
