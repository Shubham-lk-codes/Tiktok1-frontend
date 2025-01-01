import axios from 'axios';

const API = axios.create({
  baseURL: 'https://tiktok1-backend.onrender.com/api',
  withCredentials: true, // Include credentials (like cookies or authorization headers) in cross-origin requests
});

// Add Authorization Token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
