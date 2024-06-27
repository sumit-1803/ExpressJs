import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../api';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Function to handle login
  const login = async (formData) => {
    try {
      const res = await api.post('/auth/login', formData);
      const newToken = res.data.token;
      setAuthToken(newToken); // Set token for API requests
      localStorage.setItem('token', newToken); // Store token in local storage
      setToken(newToken); // Set token in state
      setIsAuthenticated(true); // Set authentication state to true
      return true; // Return true on successful login
    } catch (err) {
      console.error('Login failed:', err.response.data);
      return false; // Return false if login fails
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setToken(null); // Clear token in state
    setIsAuthenticated(false); // Set authentication state to false
  };

  // Effect to check token on load
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
