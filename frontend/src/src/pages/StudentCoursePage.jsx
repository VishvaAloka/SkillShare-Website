// filepath: /src/pages/StudentCoursePage.jsx
import React from 'react';
import CourseGrid from '../components/courses/CourseGrid';

const StudentCoursePage = () => {
  return (
    <div>
      <h1>Available Courses</h1>
      <CourseGrid />
    </div>
  );
};

export default StudentCoursePage;