Sure, here's the contents for the file: /src/components/courses/CourseGrid.jsx

import React, { useState } from "react";
import CourseCard from "./CourseCard";

const CourseGrid = ({ courses, isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
        Toggle to {viewMode === "grid" ? "List" : "Grid"} View
      </button>
      <div className={viewMode === "grid" ? "grid-container" : "list-container"}>
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;