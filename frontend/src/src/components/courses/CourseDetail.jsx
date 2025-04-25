import React from 'react';

const CourseDetail = ({ course }) => {
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-detail">
      <h1>{course.title}</h1>
      <img src={course.image} alt={course.title} />
      <p>{course.description}</p>
      <h2>Price: ${course.price}</h2>
      <button onClick={() => alert('Payment initiated for ' + course.title)}>Pay for Course</button>
    </div>
  );
};

export default CourseDetail;