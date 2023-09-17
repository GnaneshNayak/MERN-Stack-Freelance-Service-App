import axios from 'axios';

const newRequest = axios.create({
  baseURL: 'https://jobjuggle.onrender.com/api',
  withCredentials: true,
});

export default newRequest;
