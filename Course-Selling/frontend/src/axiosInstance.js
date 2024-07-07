// src/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
  withCredentials: true, // Enable cookies for CORS
  headers: {
    'Content-Type': 'application/json',
    // You can add other default headers here
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent, e.g., attach auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Do something with successful response data
    return response;
  },
  error => {
    // Handle response error
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
