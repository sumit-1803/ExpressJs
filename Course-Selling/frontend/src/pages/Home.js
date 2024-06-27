import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseList from '../components/CourseList';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold text-gray-800">Available Courses</h1>
        <div className="flex justify-center mt-4">
          {isAuthenticated ? (
            <div className="flex items-center">
              <p className="mr-4 text-gray-800">Hello, User</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col items-center mt-8'>
        <CourseList />
      </div>
    </div>
  );
};

export default Home;
