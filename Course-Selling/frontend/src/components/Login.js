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
    <div className="container mx-auto mt-56 px-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mt-8 mb-4">Login</h1>
      <form onSubmit={onSubmit} className="max-w-md mx-auto mt-8">
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
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
