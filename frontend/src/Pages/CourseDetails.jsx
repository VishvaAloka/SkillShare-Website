import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, Users, CheckCircle, BookOpen, Award } from "lucide-react";
import { useParams, Link } from "react-router-dom";

// In a real application, we would fetch this data from an API based on course ID
const coursesData = {
  1: {
    id: 1,
    title: "Advanced JavaScript Fundamentals",
    description: "Master the core concepts of JavaScript including closures, prototypes, and asynchronous programming.",
    fullDescription: `
      Take your JavaScript skills to the next level with this comprehensive course on advanced JavaScript fundamentals. 
      
      You'll dive deep into the language's core concepts and gain a thorough understanding of how JavaScript really works under the hood. From closures and prototypes to async/await and ES6+ features, this course covers everything you need to write clean, efficient, and professional JavaScript code.
      
      By the end of this course, you'll have the confidence to tackle complex JavaScript applications and the knowledge to optimize your code for better performance.
    `,
    image: "/api/placeholder/800/450",
    price: 49.99,
    rating: 4.8,
    duration: "12 hours",
    lectures: 45,
    students: 1254,
    category: "Programming",
    instructor: "Sarah Johnson",
    lastUpdated: "March 2025",
    featured: true,
    curriculum: [
      {
        title: "Introduction to Advanced JavaScript",
        lectures: [
          "Course Overview and Setup",
          "JavaScript Engine and Runtime",
          "Execution Context and Call Stack"
        ]
      },
      {
        title: "Closures and Scope",
        lectures: [
          "Understanding Lexical Scope",
          "Closure Mechanics",
          "Practical Applications of Closures"
        ]
      },
      {
        title: "Prototypes and Inheritance",
        lectures: [
          "Prototype Chain Explained",
          "Constructor Functions vs Classes",
          "Implementing Inheritance Patterns"
        ]
      }
    ],
    whatYouWillLearn: [
      "Master JavaScript's closure system and scope chain",
      "Understand prototypal inheritance and object composition",
      "Write asynchronous code using Promises and async/await",
      "Implement advanced patterns like modules and IIFE",
      "Optimize your code for better performance"
    ]
  },
  2: {
    id: 2,
    title: "React & Redux Masterclass",
    description: "Build professional applications with React and manage state effectively with Redux.",
    fullDescription: `
      This comprehensive course will take you from React basics to advanced concepts and best practices.
      
      You'll learn how to build professional-grade applications with React while managing complex state with Redux. We'll cover component architecture, hooks, context API, and how to integrate with backend services. You'll also learn testing, performance optimization, and deployment strategies.
      
      By the end of this course, you'll be able to build enterprise-level React applications with confidence.
    `,
    image: "/api/placeholder/800/450",
    price: 59.99,
    rating: 4.9,
    duration: "15 hours",
    lectures: 60,
    students: 3421,
    category: "Web Development",
    instructor: "Michael Chen",
    lastUpdated: "April 2025",
    featured: false,
    curriculum: [
      {
        title: "React Fundamentals",
        lectures: [
          "Introduction to React",
          "Components and Props",
          "State and Lifecycle"
        ]
      },
      {
        title: "Advanced React Patterns",
        lectures: [
          "Hooks in Depth",
          "Context API",
          "Higher Order Components"
        ]
      },
      {
        title: "Redux Integration",
        lectures: [
          "Redux Core Concepts",
          "Redux Toolkit",
          "Asynchronous Actions with Redux"
        ]
      }
    ],
    whatYouWillLearn: [
      "Build complex UIs with React's component system",
      "Manage application state effectively with Redux",
      "Implement advanced React patterns and hooks",
      "Create performant and testable React applications",
      "Deploy React applications to production"
    ]
  }
  // Additional courses would be defined here
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // Simulate API fetch
    const fetchCourse = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      const courseData = coursesData[courseId];
      
      setTimeout(() => {
        setCourse(courseData);
        setLoading(false);
      }, 800);
    };
    
    fetchCourse();
  }, [courseId]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Course not found</h2>
        <p className="text-gray-600 mt-2">The course you're looking for doesn't exist</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 flex items-center text-purple-600 font-medium"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back to courses
        </motion.button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-8">
        <div className="container mx-auto px-4">
          <motion.button
            whileHover={{ x: -3 }}
            className="flex items-center text-white mb-6"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back to courses
          </motion.button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>
              
              <p className="text-white text-opacity-90 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-white text-opacity-90">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" />
                  <span>{course.rating} rating</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-1" />
                  <span>{course.students} students</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{course.duration}</span>
                </div>
                
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-1" />
                  <span>{course.lectures} lectures</span>
                </div>
                
                <div>
                  <span className="text-xs uppercase font-bold bg-white bg-opacity-20 px-2 py-1 rounded">
                    {course.category}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 text-white text-opacity-90">
                <span>Created by <span className="font-medium">{course.instructor}</span></span>
                <span className="mx-2">•</span>
                <span>Last updated {course.lastUpdated}</span>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium flex justify-center items-center mb-4"
                  >
                    Enroll Now
                  </motion.button>
                  
                  <div className="text-center text-gray-600 text-sm mb-6">
                    30-day money-back guarantee
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">This course includes:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{course.duration} of video content</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{course.lectures} lectures</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <Award className="w-4 h-4 mr-2 text-gray-500" />
                        <span>Certificate of Completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
