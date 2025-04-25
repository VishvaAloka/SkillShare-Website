import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import CourseCard from "../components/CourseCard";

// Sample course data - in a real app this would come from an API
const sampleCourses = [
  {
    id: 1,
    title: "Advanced JavaScript Fundamentals",
    description: "Master the core concepts of JavaScript including closures, prototypes, and asynchronous programming.",
    image: "/api/placeholder/400/220",
    price: 49.99,
    rating: 4.8,
    duration: "12 hours",
    students: 1254,
    category: "Programming",
    featured: true
  },
  {
    id: 2,
    title: "React & Redux Masterclass",
    description: "Build professional applications with React and manage state effectively with Redux.",
    image: "/api/placeholder/400/220",
    price: 59.99,
    rating: 4.9,
    duration: "15 hours",
    students: 3421,
    category: "Web Development",
    featured: false
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    description: "Learn essential design principles to create intuitive and attractive user interfaces.",
    image: "/api/placeholder/400/220",
    price: 39.99,
    rating: 4.7,
    duration: "10 hours",
    students: 876,
    category: "Design",
    featured: false
  },
  {
    id: 4,
    title: "Python for Data Science",
    description: "Use Python to analyze data, create visualizations, and build predictive models.",
    image: "/api/placeholder/400/220",
    price: 54.99,
    rating: 4.6,
    duration: "18 hours",
    students: 2145,
    category: "Data Science",
    featured: true
  },
  {
    id: 5,
    title: "Full Stack Development with MERN",
    description: "Build full-stack applications with MongoDB, Express, React, and Node.js.",
    image: "/api/placeholder/400/220",
    price: 79.99,
    rating: 4.9,
    duration: "24 hours",
    students: 1879,
    category: "Web Development",
    featured: false
  },
  {
    id: 6,
    title: "Mobile App Development with Flutter",
    description: "Create beautiful cross-platform mobile applications with Flutter and Dart.",
    image: "/api/placeholder/400/220",
    price: 64.99,
    rating: 4.8,
    duration: "20 hours",
    students: 1543,
    category: "Mobile Development",
    featured: false
  }
];

export default function CourseListing() {
  const [courses, setCourses] = useState(sampleCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const navigate = useNavigate();  // Initialize useNavigate hook
  
  const categories = ["All", "Programming", "Web Development", "Design", "Data Science", "Mobile Development"];
  
  const filteredCourses = courses.filter(course => {
    return course.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
           (categoryFilter === "" || categoryFilter === "All" || course.category === categoryFilter);
  });

  // Function to handle course click and navigate to Payment page
  const handleCourseClick = (course) => {
    navigate("/payment", { state: { course } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-6">Discover Top Courses</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
              />
            </div>
            
            <div className="relative">
              <button 
                className="bg-white px-4 py-3 rounded-lg flex items-center text-gray-800 w-full md:w-auto justify-between"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="mr-2 h-5 w-5" />
                <span>{categoryFilter || "All Categories"}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10"
                >
                  <ul className="py-2">
                    {categories.map((category) => (
                      <li 
                        key={category}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setCategoryFilter(category === "All" ? "" : category);
                          setIsFilterOpen(false);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="cursor-pointer" onClick={() => handleCourseClick(course)}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-600">No courses found matching your criteria</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}