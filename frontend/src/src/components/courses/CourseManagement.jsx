import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import CourseGrid from './CourseGrid';
import { fetchCourses, addCourse, updateCourse, deleteCourse } from '../../services/courseService';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      const fetchedCourses = await fetchCourses();
      setCourses(fetchedCourses);
    };
    loadCourses();
  }, []);

  const handleAddCourse = async (courseData) => {
    const newCourse = await addCourse(courseData);
    setCourses([...courses, newCourse]);
  };

  const handleEditCourse = async (courseData) => {
    const updatedCourse = await updateCourse(courseData);
    setCourses(courses.map(course => (course.id === updatedCourse.id ? updatedCourse : course)));
    setIsEditing(false);
    setCurrentCourse(null);
  };

  const handleDeleteCourse = async (courseId) => {
    await deleteCourse(courseId);
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleEditClick = (course) => {
    setIsEditing(true);
    setCurrentCourse(course);
  };

  return (
    <div>
      <h1>Course Management</h1>
      <CourseForm 
        onSubmit={isEditing ? handleEditCourse : handleAddCourse} 
        initialData={currentCourse} 
      />
      <CourseGrid 
        courses={courses} 
        onEdit={handleEditClick} 
        onDelete={handleDeleteCourse} 
      />
    </div>
  );
};

export default CourseManagement;