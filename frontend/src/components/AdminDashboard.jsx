import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Ticket, BookOpen, FileText, Search, Filter, 
  Bell, LogOut, ChevronDown, User, Plus, Calendar, Trash2
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [tickets, setTickets] = useState([
    {
      id: "TIC-12345",
      title: "Issue with course access",
      category: "technical",
      status: "in-progress",
      priority: "medium",
      student: "John Doe",
      createdAt: "2025-04-15T10:30:00Z",
      updatedAt: "2025-04-19T14:22:00Z",
      unread: false
    },
    {
      id: "TIC-12346",
      title: "Certificate request",
      category: "certificate",
      status: "new",
      priority: "low",
      student: "Jane Smith",
      createdAt: "2025-04-18T08:15:00Z",
      updatedAt: "2025-04-18T08:15:00Z",
      unread: true
    },
    {
      id: "TIC-12347",
      title: "Payment issue with React course",
      category: "billing",
      status: "new",
      priority: "high",
      student: "Mike Johnson",
      createdAt: "2025-04-19T14:22:00Z",
      updatedAt: "2025-04-19T14:22:00Z",
      unread: true
    },
    {
      id: "TIC-12348",
      title: "Request for additional learning materials",
      category: "course",
      status: "closed",
      priority: "medium",
      student: "Sarah Williams",
      createdAt: "2025-04-10T09:45:00Z",
      updatedAt: "2025-04-16T11:30:00Z",
      unread: false
    }
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Fundamentals",
      students: 124,
      rating: 4.7,
      price: 49.99,
      image: "gradient-purple"
    },
    {
      id: 2,
      title: "Tailwind CSS Mastery",
      students: 98,
      rating: 4.8,
      price: 39.99,
      image: "gradient-blue"
    },
    {
      id: 3,
      title: "JavaScript Advanced",
      students: 156,
      rating: 4.5,
      price: 59.99,
      image: "gradient-yellow"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTickets = tickets.filter(ticket => {
    // Filter by search query
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ticket.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "technical":
        return <Ticket className="w-4 h-4" />;
      case "billing":
        return <FileText className="w-4 h-4" />;
      case "course":
        return <BookOpen className="w-4 h-4" />;
      case "certificate":
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleDeleteTicket = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket? This action cannot be undone.")) {
      setTickets(tickets.filter(ticket => ticket.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white shadow-md hidden md:block"
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500">Student Support System</p>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "dashboard" 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab("tickets")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "tickets" 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Ticket className="w-5 h-5 mr-3" />
            Support Tickets
          </button>
          
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "courses" 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BookOpen className="w-5 h-5 mr-3" />
            Courses
          </button>
          
          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "feedback" 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                : "text-gray-700 hover:bg-gray-100"

                