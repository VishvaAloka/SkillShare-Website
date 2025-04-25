"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Paperclip,
  X,
  MoreVertical,
  Trash2,
  Clock,
  User,
  Download,
  MessageCircle,
  Calendar,
  AlertCircle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

export default function TicketView() {
  const [ticket, setTicket] = useState({
    id: "TIC-12345",
    title: "Issue with course access",
    description:
      "I cannot access the React course materials after completing the payment. I've tried logging out and back in, but I still can't see the course in my dashboard. Please help me resolve this issue as soon as possible.",
    category: "technical",
    priority: "medium",
    status: "in-progress",
    createdAt: "2025-04-15T10:30:00Z",
    updatedAt: "2025-04-19T14:22:00Z",
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      content:
        "I cannot access the React course materials after completing the payment. I've tried logging out and back in, but I still can't see the course in my dashboard. Please help me resolve this issue as soon as possible.",
      sender: "student",
      timestamp: "2025-04-15T10:30:00Z",
      attachments: [],
    },
    {
      id: 2,
      content:
        "Thank you for reporting this issue. I'll look into it right away. Could you please tell me when you made the payment and provide your order number if possible?",
      sender: "admin",
      timestamp: "2025-04-15T11:45:00Z",
      attachments: [],
    },
    {
      id: 3,
      content:
        "I made the payment yesterday (April 14th) around 3 PM. The order number is #ORD-89765. I received a confirmation email saying the payment was successful.",
      sender: "student",
      timestamp: "2025-04-15T12:30:00Z",
      attachments: [
        {
          id: "att-1",
          name: "payment_confirmation.pdf",
          size: 245000,
          type: "application/pdf",
        },
      ],
    },
    {
      id: 4,
      content:
        "Thank you for providing that information. I've checked our system and found that there was a delay in activating your course access. I've manually added the course to your account. Please try refreshing your dashboard or logging out and back in again. Let me know if you can access it now.",
      sender: "admin",
      timestamp: "2025-04-19T14:22:00Z",
      attachments: [
        {
          id: "att-2",
          name: "access_instructions.pdf",
          size: 352000,
          type: "application/pdf",
        },
      ],
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = [...files];

    uploadedFiles.forEach((file) => {
      // Check if file is PDF or image
      if (file.type.startsWith("image/") || file.type === "application/pdf") {
        newFiles.push({
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
        });
      }
    });

    setFiles(newFiles);
  };

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() && files.length === 0) return;

    setIsSubmitting(true);

    try {
      // Prepare attachments data
      const attachments = files.map((file) => ({
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
      }));

      // Create new message
      const newMsg = {
        id: Date.now(),
        content: newMessage.trim(),
        sender: "student",
        timestamp: new Date().toISOString(),
        attachments: attachments,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Add message to state
      setMessages((prev) => [...prev, newMsg]);

      // Clear form
      setNewMessage("");
      setFiles([]);

      // Update ticket's updated timestamp
      setTicket((prev) => ({
        ...prev,
        updatedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4" />;
      case "in-progress":
        return <RefreshCw className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-amber-100 text-amber-800";
      case "resolved":
        return "bg-emerald-100 text-emerald-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteTicket = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this ticket? This action cannot be undone."
      )
    ) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Redirect to profile page
        window.location.href = "/profile";
      } catch (error) {
        console.error("Error deleting ticket:", error);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.9 },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        duration: 2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <button
            onClick={() => (window.location.href = "/profile")}
            className="flex items-center text-gray-700 hover:text-purple-600 transition-colors group"
          >
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              className="mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
            <span className="font-medium group-hover:translate-x-[-3px] transition-transform">
              Back to Support Tickets
            </span>
          </button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-3">
                  <motion.div
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mr-3 shadow-md"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      {ticket.title}
                    </h1>
                    <div className="flex items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{
                            rotate: ticket.status === "in-progress" ? 360 : 0,
                          }}
                          transition={{
                            repeat:
                              ticket.status === "in-progress"
                                ? Number.POSITIVE_INFINITY
                                : 0,
                            duration: 3,
                            ease: "linear",
                          }}
                          className="mr-1"
                        >
                          {getStatusIcon(ticket.status)}
                        </motion.div>
                        <span className="ml-1">
                          {ticket.status === "in-progress"
                            ? "In Progress"
                            : ticket.status.charAt(0).toUpperCase() +
                              ticket.status.slice(1)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <span className="flex items-center mr-4">
                    <motion.div
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      className="mr-1"
                    >
                      <Calendar className="w-4 h-4" />
                    </motion.div>
                    <span>Created {formatDate(ticket.createdAt)}</span>
                  </span>
                  <span className="flex items-center">
                    <motion.div
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      className="mr-1"
                    >
                      <Clock className="w-4 h-4" />
                    </motion.div>
                    <span>Ticket ID: {ticket.id}</span>
                  </span>
                </div>
              </div>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <MoreVertical className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-200"
                    >
                      <motion.button
                        whileHover={{ backgroundColor: "#FEE2E2", x: 3 }}
                        onClick={handleDeleteTicket}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                          className="mr-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.div>
                        Delete Ticket
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
          >
            <div className="flex items-center mb-4">
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="mr-2"
              >
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </motion.div>
              <h2 className="text-lg font-semibold text-gray-900">
                Conversation
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  variants={itemVariants}
                  custom={index}
                  className={`flex ${
                    message.sender === "student"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`max-w-3xl rounded-2xl p-4 ${
                      message.sender === "student"
                        ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-gray-800 border border-purple-100"
                        : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === "student"
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                            : "bg-gradient-to-r from-gray-700 to-gray-800"
                        } shadow-md`}
                      >
                        <User className="w-4 h-4 text-white" />
                      </motion.div>
                      <div className="ml-2">
                        <p className="font-medium text-sm">
                          {message.sender === "student"
                            ? "You"
                            : "Support Admin"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(message.timestamp)}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-800 mb-3 whitespace-pre-wrap">
                      {message.content}
                    </p>

                    {message.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-medium text-gray-500">
                          Attachments:
                        </p>
                        {message.attachments.map((attachment) => (
                          <motion.div
                            key={attachment.id}
                            whileHover={{
                              y: -2,
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                            className="flex items-center justify-between bg-white rounded-lg p-2 shadow-sm border border-gray-100"
                          >
                            <div className="flex items-center">
                              <motion.div
                                whileHover={{ rotate: 10 }}
                                className="w-8 h-8 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center"
                              >
                                <Paperclip className="w-4 h-4 text-blue-600" />
                              </motion.div>
                              <div className="ml-2">
                                <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                  {attachment.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(attachment.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.2, rotate: 15 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Download className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
          >
            <div className="flex items-center mb-4">
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="mr-2"
              >
                <Send className="w-5 h-5 text-purple-600" />
              </motion.div>
              <h2 className="text-lg font-semibold text-gray-900">Add Reply</h2>
            </div>

            <form onSubmit={handleSubmitMessage}>
              <motion.div whileFocus={{ scale: 1.01 }} className="mb-4">
                <textarea
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  placeholder="Type your message here..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                ></textarea>
              </motion.div>

              {files.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-4 space-y-2"
                >
                  <p className="text-sm font-medium text-gray-700">
                    Attachments:
                  </p>
                  {files.map((file, index) => (
                    <motion.div
                      key={file.id}
                      variants={itemVariants}
                      custom={index}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-100"
                    >
                      <div className="flex items-center">
                        <motion.div
                          whileHover={{ rotate: 10 }}
                          className="w-8 h-8 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center"
                        >
                          {file.type.startsWith("image/") ? (
                            <img
                              src={
                                URL.createObjectURL(file.file) ||
                                "/placeholder.svg"
                              }
                              alt="preview"
                              className="w-6 h-6 object-cover rounded"
                            />
                          ) : (
                            <Paperclip className="w-4 h-4 text-blue-600" />
                          )}
                        </motion.div>
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
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload-reply"
                    accept="image/*,.pdf"
                  />
                  <motion.label
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    htmlFor="file-upload-reply"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition border border-gray-200 shadow-sm"
                  >
                    <motion.div whileHover={{ rotate: 15 }} className="mr-2">
                      <Paperclip className="w-4 h-4" />
                    </motion.div>
                    Attach Files
                  </motion.label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={
                    isSubmitting || (!newMessage.trim() && files.length === 0)
                  }
                  className={`px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition flex items-center justify-center ${
                    isSubmitting || (!newMessage.trim() && files.length === 0)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    ></motion.div>
                  ) : (
                    <motion.div
                      whileHover={{
                        x: [0, 5, 0],
                        transition: {
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1,
                        },
                      }}
                      className="mr-2"
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  )}
                  Send Reply
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
