// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import API from '../utils/api';
// eslint-disable-next-line no-unused-vars
import AuthHome from '../components/AuthHome';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/users/login', formData);
      console.log(response.data); // Debug: Log the response to verify its structure
      const { token } = response.data; // Destructure token from the response
      if (token) {
        localStorage.setItem('token', token);
        window.location.href = '/AuthHome';
      } else {
        alert('Token not found in response');
      }
    } catch (error) {
      console.error('Error during login:', error); // Debug: Log the error
      alert('Invalid credentials');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 shadow-lg rounded text-black">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full mb-4 p-2 border"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border"
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default Login;
