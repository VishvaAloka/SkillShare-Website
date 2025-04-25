import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Book,
  BookOpen,
  UserCheck,
  UserCog,
  UserPlus,
  Download,
  Search,
  Presentation,
  GraduationCap,
  Lightbulb,
  Workflow,
} from "lucide-react";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [userTypeFilter, setUserTypeFilter] = useState("all");

  // Fetch users from MySQL backend
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3306/api/users") // Adjusted port for MySQL
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
        showNotification("Failed to load users", "error");
      });
  }, []);

  // Notification helper function
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Handle user edit
  const handleEdit = (user) => {
    setEditUser({ ...user }); // Clone the object before editing
    setShowEditModal(true);
  };

  // Handle user delete
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:3306/api/users/${userId}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== userId));
          showNotification("User deleted successfully", "success");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          showNotification("Failed to delete user", "error");
        });
    }
  };

  // Handle edit form submission
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3306/api/users/${editUser.id}`, editUser)
      .then((response) => {
        setUsers(
          users.map((user) => (user.id === editUser.id ? response.data : user))
        );
        setShowEditModal(false);
        showNotification("User updated successfully", "success");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        showNotification("Failed to update user", "error");
      });
  };

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value })); // Update state
  };

  // Download user report
  const handleDownloadReport = () => {
    setLoading(true);
    try {
      const csvContent = generateCSV(filteredUsers);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "users_report.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setLoading(false);
      showNotification("Report downloaded successfully", "success");
    } catch (error) {
      console.error("Error downloading report:", error);
      setLoading(false);
      showNotification("Failed to download report", "error");
    }
  };

  // Generate CSV for user report
  const generateCSV = (users) => {
    let csv = "Username,Email,Role,Registration Date\n";
    users.forEach((user) => {
      csv += `${user.username},${user.email},${user.role},${user.registration_date}\n`;
    });
    return csv;
  };

  // Handle user type filter
  const handleUserTypeFilterChange = (e) => {
    setUserTypeFilter(e.target.value);
  };

  // Filter users
  const filteredUsers = users.filter(
    (user) =>
      (userTypeFilter === "all" || user.role === userTypeFilter) &&
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // User role icons with enhanced styling and subtle animations
  const userRoleIcons = {
    student: (
      <div className="group relative">
        <GraduationCap
          className="text-blue-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
          size={24}
        />
        <span className="absolute -top-2 -right-2 animate-ping w-3 h-3 bg-blue-400 rounded-full opacity-75"></span>
      </div>
    ),
    instructor: (
      <div className="group relative">
        <Presentation
          className="text-green-600 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300"
          size={24}
        />
        <span className="absolute -top-2 -right-2 animate-ping w-3 h-3 bg-green-400 rounded-full opacity-75"></span>
      </div>
    ),
    admin: (
      <div className="group relative">
        <Workflow
          className="text-red-600 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
          size={24}
        />
        <span className="absolute -top-2 -right-2 animate-ping w-3 h-3 bg-red-400 rounded-full opacity-75"></span>
      </div>
    ),
    moderator: (
      <div className="group relative">
        <Lightbulb
          className="text-purple-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
          size={24}
        />
        <span className="absolute -top-2 -right-2 animate-ping w-3 h-3 bg-purple-400 rounded-full opacity-75"></span>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 mt-24">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <Users className="mr-3 animate-pulse" /> User Management
              </h1>
              <p className="text-gray-500 mt-2">
                Manage platform users and access rights
              </p>
            </div>
            <button
              onClick={handleDownloadReport}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
            >
              <Download className="mr-2 animate-bounce" /> Download Report
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
              <div className="relative flex-grow md:mr-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={userTypeFilter}
                onChange={handleUserTypeFilterChange}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="instructor">Instructors</option>
                <option value="admin">Admins</option>
                <option value="moderator">Moderators</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Role</th>
                      <th className="p-3 text-left">Registration Date</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="p-3 flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 animate-pulse">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          {user.username}
                        </td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            {userRoleIcons[user.role] || userRoleIcons.student}
                            <span className="ml-2 capitalize">{user.role}</span>
                          </div>
                        </td>
                        <td className="p-3">{user.registration_date}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-blue-500 hover:text-blue-700 mr-3 transform hover:scale-110 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-500 hover:text-red-700 transform hover:scale-110 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Edit User Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">Edit User</h2>
              <form onSubmit={handleSubmitEdit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editUser.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editUser.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Role</label>
                  <select
                    name="role"
                    value={editUser.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notification */}
        {notification.show && (
          <div
            className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white flex items-center animate-slide-in-right`}
          >
            {notification.message}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUser;
