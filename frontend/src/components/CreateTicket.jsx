import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, X, Paperclip, Send } from "lucide-react";

export default function CreateTicket() {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    category: "technical",
    priority: "medium"
  });
  
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = [...files];
    
    uploadedFiles.forEach(file => {
      // Check if file is PDF or image
      if (file.type.startsWith("image/") || file.type === "application/pdf") {
        newFiles.push({
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          file: file
        });
      }
    });
    
    setFiles(newFiles);
  };

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!ticket.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!ticket.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock success response
        console.log("Ticket submitted:", ticket);
        console.log("Files:", files);
        
        // Redirect to tickets page (would use router in actual implementation)
        window.location.href = "/profile";
      } catch (error) {
        console.error("Error submitting ticket:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <button 
            onClick={() => window.location.href = "/profile"}
            className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Support Ticket</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Ticket Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={ticket.title}
                onChange={handleInputChange}
                placeholder="Brief description of your issue"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
              />
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.title}
                </motion.p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={ticket.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white"
                >
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="course">Course Content</option>
                  <option value="account">Account Management</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={ticket.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={ticket.description}
                onChange={handleInputChange}
                rows="6"
                placeholder="Please provide detailed information about your issue..."
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
              ></textarea>
              {errors.description && (
               
                  <motion.p
                  initial={{ opacity:  0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.description}
                </motion.p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center justify-center py-4">
                  <Paperclip className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                  <p className="text-xs text-gray-500">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,.pdf"
                  />
                  <motion.label
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    htmlFor="file-upload"
                    className="mt-3 cursor-pointer inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Browse Files
                  </motion.label>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Attached Files:</p>
                  {files.map(file => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                          {file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file.file)}
                              alt="preview"
                              className="w-6 h-6 object-cover rounded"
                            />
                          ) : (
                            <Paperclip className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto float-right px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Submit Ticket
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}