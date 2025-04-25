// filepath: /src/components/admin/AdminCourseList.jsx
import React, { useEffect, useState } from 'react';
import CourseCard from '../courses/CourseCard';
import CourseForm from '../courses/CourseForm';
import { fetchCourses, deleteCourse } from '../../services/courseService';

const AdminCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses();
      setCourses(data);
    };
    getCourses();
  }, []);

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setIsEditing(true);
  };

  const handleDelete = async (courseId) => {
    await deleteCourse(courseId);
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleFormSubmit = (course) => {
    if (isEditing) {
      setCourses(courses.map(c => (c.id === course.id ? course : c)));
    } else {
      setCourses([...courses, course]);
    }
    setIsEditing(false);
    setCurrentCourse(null);
  };

  return (
    <div>
      <h1>Admin Course Management</h1>
      <CourseForm 
        onSubmit={handleFormSubmit} 
        currentCourse={currentCourse} 
        isEditing={isEditing} 
      />
      <div className="course-list">
        {courses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onEdit={() => handleEdit(course)} 
            onDelete={() => handleDelete(course.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default AdminCourseList;