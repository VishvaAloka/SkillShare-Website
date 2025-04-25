"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
    grade: "",
    stream: "",
    phoneNumber: "",
    parentEmail: "",
    subjectsInterested: [],
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateStepOne = () => {
    const tempErrors = {};
    if (!formData.username) tempErrors.username = "Username is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords don't match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStepTwo = () => {
    const tempErrors = {};
    if (!formData.schoolName) tempErrors.schoolName = "School name is required";
    if (!formData.grade) tempErrors.grade = "Grade is required";
    if (!formData.stream) tempErrors.stream = "Stream is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStepThree = () => {
    const tempErrors = {};
    if (!formData.phoneNumber)
      tempErrors.phoneNumber = "Phone number is required";
    if (!formData.parentEmail) {
      tempErrors.parentEmail = "Parent's email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      tempErrors.parentEmail = "Email is invalid";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStepThree()) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form submitted:", formData);
        // Add your registration logic here
      } catch (error) {
        console.error("Registration error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        const updatedSubjects = checked
          ? [...(prev.subjectsInterested || []), value]
          : (prev.subjectsInterested || []).filter(
              (subject) => subject !== value
            );
        return {
          ...prev,
          subjectsInterested: updatedSubjects,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const nextStep = () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = validateStepOne();
    } else if (currentStep === 2) {
      isValid = validateStepTwo();
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div>
              <motion.div whileTap={{ scale: 0.99 }} className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <User className="w-5 h-5" />
                  </motion.div>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-black`}
                />
                <AnimatePresence>
                  {errors.username && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.username}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div>
              <motion.div whileTap={{ scale: 0.99 }} className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Mail className="w-5 h-5" />
                  </motion.div>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-black`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div>
              <motion.div whileTap={{ scale: 0.99 }} className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Lock className="w-5 h-5" />
                  </motion.div>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-black`}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </motion.button>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div>
              <motion.div whileTap={{ scale: 0.99 }} className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Lock className="w-5 h-5" />
                  </motion.div>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-black`}
                />
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="School Name"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.schoolName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-black`}
              />
              <AnimatePresence>
                {errors.schoolName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.schoolName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.grade ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-black`}
                >
                  <option value="">Grade</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
                <AnimatePresence>
                  {errors.grade && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.grade}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="w-1/2">
                <select
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.stream ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-black`}
                >
                  <option value="">Stream</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
                <AnimatePresence>
                  {errors.stream && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.stream}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-black`}
              />
              <AnimatePresence>
                {errors.phoneNumber && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.phoneNumber}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                placeholder="Parent's Email"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.parentEmail ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-black`}
              />
              <AnimatePresence>
                {errors.parentEmail && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.parentEmail}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <p className="mb-2 text-gray-700">Subjects Interested In</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Mathematics",
                  "Science",
                  "English",
                  "History",
                  "Geography",
                  "ICT",
                ].map((subject) => (
                  <div key={subject} className="flex items-center">
                    <input
                      type="checkbox"
                      id={subject}
                      name="subjectsInterested"
                      value={subject}
                      checked={formData.subjectsInterested.includes(subject)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor={subject}>{subject}</label>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-white p-4 -mt-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create Your Account
            </h1>
            <div className="flex justify-center items-center my-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                1
              </div>
              <div
                className={`h-1 w-16 ${
                  currentStep >= 2
                    ? "bg-from-purple-600 to-blue-600"
                    : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                2
              </div>
              <div
                className={`h-1 w-16 ${
                  currentStep === 3
                    ? "bg-gradient-to-r from-purple-600 to-blue-600"
                    : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 3
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                3
              </div>
            </div>
            <p className="mt-2 text-gray-600">
              {currentStep === 1
                ? "Personal Details"
                : currentStep === 2
                ? "Academic Information"
                : "Additional Information"}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {renderStepContent()}

            <div className="flex justify-between">
              {currentStep > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                >
                  Previous
                </motion.button>
              )}
              {currentStep < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:opacity-90 transition duration-200"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="ml-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:opacity-90 transition duration-200 relative overflow-hidden"
                >
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center"
                    >
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </motion.div>
                  ) : (
                    <span>Submit</span>
                  )}
                </motion.button>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4"
            >
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Sign in
                </a>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
