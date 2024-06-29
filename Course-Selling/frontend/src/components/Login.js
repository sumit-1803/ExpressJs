import React, { useState } from 'react';
import api, { setAuthToken } from '../api.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      const token = res.data.token;
      setAuthToken(token);
      localStorage.setItem('token', token);
      toast.success('Login successful ... Please reload once to reflect');
      console.log('Logged in successfully');
      navigate('/'); // Redirect to home or dashboard
    } catch (err) {
      console.error(err.response.data);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-amber-200 to-yellow-500 flex justify-center items-center">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mt-8 mb-4">Login</h1>
        <form onSubmit={onSubmit} className="max-w-md mx-auto  bg-white p-8 rounded-lg shadow-gray-950 shadow-2xl">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            className="w-full p-3 border-2 border-gray-300 mb-4 rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 mb-4 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-md"
          >
            Login
          </button>

          <p className="text-center mt-4">already have an account? <a href="/register" className="text-blue-500">Register</a></p>
        </form>
      </div> 
    </div>
  );
};

export default Login;
