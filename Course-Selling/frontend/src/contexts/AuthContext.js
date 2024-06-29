import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // Function to handle login
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    const decoded = jwtDecode(newToken);
    console.log('Decoded User:', decoded.user); // Log decoded user
    setUser(decoded.user);
  };
  

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null); // Clear user data on logout
  };

  // Effect to check token on load
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      const decoded = jwtDecode(token);
      setUser(decoded.user); // Initialize user data from token on app load
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
