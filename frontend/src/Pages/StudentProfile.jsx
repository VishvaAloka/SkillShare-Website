import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, MapPin, Calendar, Briefcase, Phone, Edit, Save, X, MessageSquare, Trash, Plus } from "lucide-react";

export default function ProfilePage() {
  // Sample profile data
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    birthdate: "1990-05-15",
    occupation: "Senior Developer",
    phone: "+1 (555) 123-4567",
    bio: "Passionate developer with over 10 years of experience in web and mobile applications. Love to learn new technologies and share knowledge with the community.",
    avatar: "/api/placeholder/150/150"
  });

  // Sample feedback data
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, text: "Great work on the new feature!", date: "2025-04-10" },
    { id: 2, text: "The dashboard design is amazing. Very intuitive!", date: "2025-03-22" },
    { id: 3, text: "Could you improve the mobile responsiveness?", date: "2025-02-15" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...profile});
  const [newFeedback, setNewFeedback] = useState("");
  const [addingFeedback, setAddingFeedback] = useState(false);

  // Handle profile edit
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save profile changes
  const saveProfileChanges = () => {
    setProfile({...editedProfile});
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
    console.log("Profile updated:", editedProfile);
  };

  // Cancel profile editing
  const cancelEditing = () => {
    setEditedProfile({...profile});
    setIsEditing(false);
  };

  // Add new feedback
  const addFeedback = () => {
    if (newFeedback.trim() === "") return;
    
    const newFeedbackItem = {
      id: feedbacks.length > 0 ? Math.max(...feedbacks.map(f => f.id)) + 1 : 1,
      text: newFeedback,
      date: new Date().toISOString().split('T')[0]
    };
    
    setFeedbacks([newFeedbackItem, ...feedbacks]);
    setNewFeedback("");
    setAddingFeedback(false);
    // Here you would typically make an API call to save the feedback
    console.log("Feedback added:", newFeedbackItem);
  };

  // Delete feedback
  const deleteFeedback = (id) => {
    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    // Here you would typically make an API call to delete the feedback
    console.log("Feedback deleted:", id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white p-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex justify-between items-start mb-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center"
            >
              <div className="relative">
                <img 
                  src={profile.avatar} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2"
                >
                  <User className="w-4 h-4 text-white" />
                </motion.div>
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-600">{profile.occupation}</p>
              </div>
            </motion.div>

            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsEditing(true);
                  setEditedProfile({...profile});
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </motion.button>
            ) : (
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={saveProfileChanges}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelEditing}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </motion.button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-purple-600 mr-3" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleProfileChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-purple-600 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleProfileChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-purple-600 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={editedProfile.location}
                      onChange={handleProfileChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <span>{profile.location}</span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                  {isEditing ? (
                    <input
                      type="date"
                      name="birthdate"
                      value={editedProfile.birthdate}
                      onChange={handleProfileChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <span>{new Date(profile.birthdate).toLocaleDateString()}</span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-purple-600 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="occupation"
                      value={editedProfile.occupation}
                      onChange={handleProfileChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <span>{profile.occupation}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Biography</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleProfileChange}
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              ) : (
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Feedback</h2>
            {!addingFeedback ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAddingFeedback(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Feedback
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAddingFeedback(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {addingFeedback && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-gray-50 p-4 rounded-lg">
                  <textarea
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    placeholder="Write your feedback here..."
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
                  ></textarea>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addFeedback}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Submit Feedback
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <motion.div
                  key={feedback.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="bg-gray-50 p-4 rounded-lg flex"
                >
                  <MessageSquare className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-1" />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <p className="text-gray-700">{feedback.text}</p>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteFeedback(feedback.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{new Date(feedback.date).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No feedback yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}