import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Users, Clock } from "lucide-react";

// This component displays individual course cards
export const CourseCard = ({ course }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
    >
      <div className="relative">
        <img
          src={course.image || "/api/placeholder/400/220"}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-purple-600">
            {course.category}
          </span>
          <div className="flex items-center">
            <Star
              className="w-4 h-4 text-yellow-500 mr-1"
              fill="currentColor"
            />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h3>

        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span>{course.students} students</span>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
          <div className="font-bold text-lg text-gray-900">${course.price}</div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
            onClick={() => (window.location.href = `/course/${course.id}`)}
          >
            View Course
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
