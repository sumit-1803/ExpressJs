import React, { useEffect, useState } from 'react';
import api from '../api';
import CourseItem from './CourseItem';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {courses.map(course => (
        <CourseItem key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
