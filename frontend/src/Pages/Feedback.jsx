import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Calendar, User, Plus, Edit, Trash, X, Save, Search, ArrowLeft, ArrowRight } from "lucide-react";

export default function FeedbackPage() {
  // Sample feedback data
  const [feedbacks, setFeedbacks] = useState([
    { 
      id: 1, 
      title: "Dashboard Redesign",
      message: "The new dashboard design is amazing! It's much more intuitive and user-friendly.",
      author: "Jane Smith",
      email: "jane.smith@example.com",
      date: "2025-04-15",
      category: "UI/UX",
      status: "Positive"
    },
    { 
      id: 2, 
      title: "Mobile Responsiveness",
      message: "I'm having issues with the mobile layout. The navigation menu doesn't collapse properly on small screens.",
      author: "Mike Johnson",
      email: "mike.j@example.com",
      date: "2025-04-10",
      category: "Bug Report",
      status: "Negative"
    },
    { 
      id: 3, 
      title: "New Feature Request",
      message: "It would be great if we could have a dark mode option for the entire application. It would help reduce eye strain during night use.",
      author: "Alex Turner",
      email: "alex.t@example.com",
      date: "2025-04-05",
      category: "Feature Request",
      status: "Neutral"
    },
    { 
      id: 4, 
      title: "Performance Improvement",
      message: "The latest update has significantly improved loading times. Great job on optimizing the application!",
      author: "Sarah Wilson",
      email: "sarah.w@example.com",
      date: "2025-04-01",
      category: "Performance",
      status: "Positive"
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({
    title: "",
    message: "",
    author: "",
    email: "",
    category: "General",
    status: "Neutral"
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Categories and status options
  const categories = ["General", "UI/UX", "Bug Report", "Feature Request", "Performance", "Other"];
  const statuses = ["Positive", "Neutral", "Negative"];

  // Add new feedback
  const handleAddFeedback = () => {
    if (!currentFeedback.title || !currentFeedback.message || !currentFeedback.author) {
      return; // Basic validation
    }
    
    const newFeedback = {
      ...currentFeedback,
      id: feedbacks.length > 0 ? Math.max(...feedbacks.map(f => f.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0]
    };
    
    setFeedbacks([newFeedback, ...feedbacks]);
    setCurrentFeedback({
      title: "",
      message: "",
      author: "",
      email: "",
      category: "General",
      status: "Neutral"
    });
    setIsAdding(false);
    // Here you would typically make an API call to save the feedback
    console.log("Feedback added:", newFeedback);
  };

  // Start editing feedback
  const startEditFeedback = (feedback) => {
    setCurrentFeedback({...feedback});
    setIsEditing(true);
  };

  // Update feedback
  const handleUpdateFeedback = () => {
    if (!currentFeedback.title || !currentFeedback.message || !currentFeedback.author) {
      return; // Basic validation
    }
    
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === currentFeedback.id ? {...currentFeedback} : feedback
    ));
    setIsEditing(false);
    // Here you would typically make an API call to update the feedback
    console.log("Feedback updated:", currentFeedback);
  };

  // Delete feedback
  const deleteFeedback = (id) => {
    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    // Here you would typically make an API call to delete the feedback
    console.log("Feedback deleted:", id);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter feedbacks based on search term
  const filteredFeedbacks = feedbacks.filter(feedback => {
    return (
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Paginate results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white p-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Feedback Management</h1>
              <p className="text-gray-600">Manage all user feedback in one place</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsAdding(true);
                setIsEditing(false);
                setCurrentFeedback({
                  title: "",
                  message: "",
                  author: "",
                  email: "",
                  category: "General",
                  status: "Neutral"
                });
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              disabled={isAdding || isEditing}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Feedback
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative mb-6"
          >
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, message, author or category..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </motion.div>

          <AnimatePresence>
            {(isAdding || isEditing) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {isAdding ? "Add New Feedback" : "Edit Feedback"}
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setIsAdding(false);
                        setIsEditing(false);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={currentFeedback.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Feedback title"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Author</label>
                      <input
                        type="text"
                        name="author"
                        value={currentFeedback.author}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Author name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={currentFeedback.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Author email"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-700 mb-1">Category</label>
                        <select
                          name="category"
                          value={currentFeedback.category}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Status</label>
                        <select
                          name="status"
                          value={currentFeedback.status}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Message</label>
                    <textarea
                      name="message"
                      value={currentFeedback.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Feedback message"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={isAdding ? handleAddFeedback : handleUpdateFeedback}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isAdding ? "Add Feedback" : "Update Feedback"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback List */}
          <div className="space-y-4">
            {currentFeedbacks.length > 0 ? (
              currentFeedbacks.map((feedback) => (
                <motion.div
                  key={feedback.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="bg-gray-50 p-5 rounded-lg"
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <h3 className="font-semibold text-lg text-gray-900">{feedback.title}</h3>
                      <div className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                        feedback.status === 'Positive' ? 'bg-green-100 text-green-800' : 
                        feedback.status === 'Negative' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {feedback.status}
                      </div>
                      <div className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {feedback.category}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => startEditFeedback(feedback)}
                        className="text-blue-500 hover:text-blue-700"
                        disabled={isAdding || isEditing}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteFeedback(feedback.id)}
                        className="text-red-500 hover:text-red-700"
                        disabled={isAdding || isEditing}
                      >
                        <Trash className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{feedback.message}</p>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{feedback.author}</span>
                      <span className="mx-1">•</span>
                      <span>{feedback.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(feedback.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10"
              >
                <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No feedback found</p>
                {searchTerm && (
                  <p className="text-gray-400 text-sm mt-1">
                    Try adjusting your search terms
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* Pagination */}
          {filteredFeedbacks.length > itemsPerPage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center mt-6"
            >
              <span className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredFeedbacks.length)} of {filteredFeedbacks.length} items
              </span>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentPage === page 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}