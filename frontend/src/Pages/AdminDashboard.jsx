import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Search, Edit, Trash2, Eye, CheckCircle, X, Menu, 
  Save, ArrowLeft, Upload, User, Book, BarChart, Settings,
  DollarSign, Clock, FileText, Image
} from "lucide-react";

// Sample course data for admin view
const initialCourses = [
  {
    id: 1,
    title: "Advanced JavaScript Fundamentals",
    description: "Master the core concepts of JavaScript including closures, prototypes, and asynchronous programming.",
    price: 49.99,
    category: "Programming",
    duration: "12 hours",
    students: 1254,
    image: "/api/placeholder/400/220",
    status: "published",
    featured: true
  },
  {
    id: 2,
    title: "React & Redux Masterclass",
    description: "Build professional applications with React and manage state effectively with Redux.",
    price: 59.99,
    category: "Web Development",
    duration: "15 hours",
    students: 3421,
    image: "/api/placeholder/400/220",
    status: "published",
    featured: false
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    description: "Learn essential design principles to create intuitive and attractive user interfaces.",
    price: 39.99,
    category: "Design",
    duration: "10 hours",
    students: 876,
    image: "/api/placeholder/400/220",
    status: "published",
    featured: false
  },
  {
    id: 4,
    title: "Python for Data Science",
    description: "Use Python to analyze data, create visualizations, and build predictive models.",
    price: 54.99,
    category: "Data Science",
    duration: "18 hours",
    students: 2145,
    image: "/api/placeholder/400/220",
    status: "draft",
    featured: false
  }
];

const categories = [
  "Programming", 
  "Web Development", 
  "Design", 
  "Data Science", 
  "Mobile Development", 
  "DevOps", 
  "Business"
];

export default function AdminDashboard() {
  // State management
  const [activeView, setActiveView] = useState("courses");
  const [courses, setCourses] = useState(initialCourses);
  const [courseFormOpen, setCourseFormOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Filter courses based on search term and status
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Add new course or update existing course
  const handleSaveCourse = (courseData) => {
    if (courseData.id) {
      // Update existing course
      setCourses(courses.map(course => 
        course.id === courseData.id ? courseData : course
      ));
    } else {
      // Add new course with generated ID
      const newId = Math.max(...courses.map(course => course.id), 0) + 1;
      setCourses([...courses, { ...courseData, id: newId }]);
    }
    setCourseFormOpen(false);
    setCurrentCourse(null);
  };
  
  // Delete course after confirmation
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    setDeleteConfirmId(null);
  };
  
  // Edit existing course
  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setCourseFormOpen(true);
  };
  
  // Create new course
  const handleCreateCourse = () => {
    setCurrentCourse({
      title: "",
      description: "",
      price: 0,
      category: "Programming",
      duration: "0 hours",
      students: 0,
      image: "/api/placeholder/400/220",
      status: "draft",
      featured: false
    });
    setCourseFormOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: isSidebarOpen ? 0 : -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        className="bg-gray-900 text-white w-64 flex-shrink-0 fixed h-full z-10"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">Course Admin</h1>
            <button 
              className="text-gray-400 hover:text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveView("courses")}
              className={`flex items-center px-4 py-3 w-full rounded-lg ${
                activeView === "courses" ? "bg-gray-800" : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <Book className="w-5 h-5 mr-3" />
              <span>Courses</span>
            </button>
            
            <button 
              onClick={() => setActiveView("students")}
              className={`flex items-center px-4 py-3 w-full rounded-lg ${
                activeView === "students" ? "bg-gray-800" : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <User className="w-5 h-5 mr-3" />
              <span>Students</span>
            </button>
            
            <button 
              onClick={() => setActiveView("analytics")}
              className={`flex items-center px-4 py-3 w-full rounded-lg ${
                activeView === "analytics" ? "bg-gray-800" : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <BarChart className="w-5 h-5 mr-3" />
              <span>Analytics</span>
            </button>
            
            <button 
              onClick={() => setActiveView("settings")}
              className={`flex items-center px-4 py-3 w-full rounded-lg ${
                activeView === "settings" ? "bg-gray-800" : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {!isSidebarOpen && (
                <button
                  className="text-gray-500 hover:text-gray-900"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
              <h1 className="text-lg font-semibold text-gray-900">
                {activeView === "courses" && "Course Management"}
                {activeView === "students" && "Student Management"}
                {activeView === "analytics" && "Analytics Dashboard"}
                {activeView === "settings" && "System Settings"}
              </h1>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Courses View */}
          {activeView === "courses" && !courseFormOpen && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              {/* Filters & Actions */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 w-full sm:w-auto"
                    />
                  </div>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 w-full sm:w-auto"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateCourse}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Course
                </motion.button>
              </div>
              
              {/* Course Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCourses.map((course) => (
                      <tr key={course.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-md object-cover" src={course.image} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{course.title}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{course.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${course.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            course.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.students}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => window.open(`/course/${course.id}`, '_blank')}
                            >
                              <Eye className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => handleEditCourse(course)}
                            >
                              <Edit className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-red-600 hover:text-red-900"
                              onClick={() => setDeleteConfirmId(course.id)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredCourses.length === 0 && (
                  <div className="text-center py-16">
                    <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Course Form (Create/Edit) */}
          {activeView === "courses" && courseFormOpen && (
            <CourseForm 
              course={currentCourse} 
              onSave={handleSaveCourse} 
              onCancel={() => {
                setCourseFormOpen(false);
                setCurrentCourse(null);
              }}
              categories={categories}
            />
          )}
          
          {/* Simple placeholders for other views */}
          {activeView === "students" && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Student Management</h2>
              <p className="text-gray-600">This section would contain student management functionality.</p>
            </div>
          )}
          
          {activeView === "analytics" && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Analytics Dashboard</h2>
              <p className="text-gray-600">This section would display analytics and reporting.</p>
            </div>
          )}
          
          {activeView === "settings" && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">System Settings</h2>
              <p className="text-gray-600">This section would contain system configuration options.</p>
            </div>
          )}
        </main>
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this course? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => handleDeleteCourse(deleteConfirmId)}
              >
                Delete Course
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Course Form Component for creating and editing courses
function CourseForm({ course, onSave, onCancel, categories }) {
  const [formData, setFormData] = useState({
    id: course.id || null,
    title: course.title || "",
    description: course.description || "",
    price: course.price || 0,
    category: course.category || "Programming",
    duration: course.duration || "0 hours",
    students: course.students || 0,
    image: course.image || "/api/placeholder/400/220",
    status: course.status || "draft",
    featured: course.featured || false
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.price || isNaN(formData.price) || formData.price < 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {course.id ? "Edit Course" : "Create New Course"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Courses
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          </div>
          
          <div className="space-y-4 md:col-span-1">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 12 hours"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.duration && (
                <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-4 md:col-span-1">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Featured Course
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Image Upload */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Course Image</h3>
            <div className="flex items-center space-x-6">
              <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={formData.image}
                  alt="Course preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 1280×720px (16:9)
                </p>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {course.id ? "Update Course" : "Create Course"}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}