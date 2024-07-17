import React, { useState } from 'react';
import api, { setAuthToken } from '../api.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      toast.success('Registration successful. Please login.');
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      console.error(err.response.data);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-200 to-yellow-500 flex justify-center items-center">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mt-8 mb-4">Register</h1>
        <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-gray-950 shadow-2xl">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            className="w-full p-3 border-2 border-gray-300 mb-4 rounded-md"
            required
          />
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
            Register
          </button>

          <p className="text-center mt-4">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
