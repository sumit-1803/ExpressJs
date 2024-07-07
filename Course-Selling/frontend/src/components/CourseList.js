import React, { useEffect, useState } from 'react';
import api from '../api';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data); // Assuming res.data is an array of courses
      } catch (err) {
        console.error(err); // Log error if fetch fails
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container h-screen mx-auto px-4 mt-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map(course => (
          <div key={course._id} className="rounded-lg overflow-hidden shadow-md hover:shadow-2xl bg-gray-200">
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{course.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-yellow-700 ">${course.price}</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
