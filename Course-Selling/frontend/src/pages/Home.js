import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseList from '../components/CourseList';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold text-gray-800">Available Courses</h1>
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
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
      </div>
      <div className='flex flex-col items-center mt-8'>
        <CourseList />
      </div>
    </div>
  );
};

export default Home;
