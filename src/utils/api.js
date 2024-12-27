import axios from 'axios';

const API = axios.create({
  baseURL: 'https://tiktok1-backend.onrender.com/api',
});

// Add Authorization Token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

