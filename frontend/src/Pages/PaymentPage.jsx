// src/pages/Payment.jsx - Updated version
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If no course in state, use a default course
    if (location.state?.course) {
      setCourse(location.state.course);
    } else {
      setCourse({
        id: "default-course",
        title: "AI for Everyone: Build Your First ML Model",
        price: 49.99,
        image: "/course-image.jpg",
      });
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFakePayment = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
      alert(`Payment Successful! You have enrolled in ${course.title}`);
      // Redirect to home
      navigate("/");
    }, 1500);
  };

  if (!course)
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 1, ease: "linear" },
            scale: { repeat: Infinity, duration: 1.5 },
          }}
          className="text-4xl text-purple-300"
        >
          ✦
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 pt-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
          <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {course.title}
              </h2>
              <p className="text-sm text-gray-500">
                Access to all course materials
              </p>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              ${course.price}
            </div>
          </div>

          <form onSubmit={handleFakePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                placeholder="John Smith"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                placeholder="4242 4242 4242 4242"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-medium text-lg mt-6 relative overflow-hidden"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <motion.span
                    className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  Processing...
                </span>
              ) : (
                "Complete Payment"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              This is a demo payment page. No real payments will be processed.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
