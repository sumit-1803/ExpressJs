import React from 'react';
import CourseList from '../components/CourseList';

import Navbar from '../components/Navbar';

const Home = () => {
  
  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-amber-200 to-yellow-500">
     <Navbar></Navbar>
        <div className="flex flex-col items-center mt-8">
          <CourseList />
        </div>
    </div>
    </>
  );
};

export default Home;
