import React from 'react';

const CourseItem = ({ course }) => {
  return (
    <div>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p>Price: ${course.price}</p>
    </div>
  );
};

export default CourseItem;
