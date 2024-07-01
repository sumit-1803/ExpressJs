import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseList from '../components/CourseList';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Home = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-200 to-yellow-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center flex justify-between">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">KnowledgeHub</h1>
          <div className="flex justify-center items-center mb-4">
            {isAuthenticated ? (
              <div className="flex items-center">
                <p className="mr-4 text-gray-800">Hello, {user.username}</p>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md mr-4"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow-md"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center mt-8">
          <CourseList />
        </div>
      </div>
    </div>
  );
};

export default Home;
