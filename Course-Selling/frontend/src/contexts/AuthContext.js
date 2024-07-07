// AuthContext.js (or equivalent)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to fetch user profile based on stored token
  const fetchUserProfile = async (token) => {
    try {
      // Decode JWT token to extract user information
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      const { user } = JSON.parse(jsonPayload);

      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error decoding or setting user profile:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('authToken'); // Clear invalid token from local storage
      navigate('/login'); // Redirect to login if token is invalid
    }
  };

  useEffect(() => {
    // Check local storage for token
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token); // Call fetchUserProfile if token exists
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [navigate]);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    fetchUserProfile(token); // Call fetchUserProfile after setting token
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
