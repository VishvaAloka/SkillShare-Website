import { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBook,
  FaFire,
  FaStar,
  FaRocket,
} from "react-icons/fa";
import {
  TbCertificate,
  TbNotebook,
  TbPuzzle,
  TbBulb,
  TbBrain,
  TbSchool,
  TbSparkles,
  TbAward,
  TbDeviceDesktop,
} from "react-icons/tb";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export const Navlinks = [
  { id: 1, name: "HOME", link: "/#" },
  { id: 2, name: "COURSES", link: "/course" },
  { id: 3, name: "RESOURCES", link: "/#resources" },
  { id: 4, name: "ABOUT US", link: "/about" },
  { id: 5, name: "COMMUNITY", link: "/community" },
  { id: 6, name: "PAYMENT", link: "/payment" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeEducationTip, setActiveEducationTip] = useState(0);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  const educationTips = [
    {
      icon: <TbBrain className="text-2xl" />,
      title: "Learning Tip",
      description: "Take regular breaks to improve knowledge retention",
    },
    {
      icon: <TbCertificate className="text-2xl" />,
      title: "New Course",
      description: "Python for Data Science now available for enrollment",
    },
    {
      icon: <TbPuzzle className="text-2xl" />,
      title: "Weekly Challenge",
      description: "Solve our coding puzzle and win learning credits",
    },
    {
      icon: <FaGraduationCap className="text-2xl" />,
      title: "Student Success",
      description: "Join our career preparation workshops this week",
    },
    {
      icon: <TbNotebook className="text-2xl" />,
      title: "Study Groups",
      description: "Connect with peers in our virtual study rooms",
    },
    {
      icon: <TbBulb className="text-2xl" />,
      title: "Learning Paths",
      description: "Personalized career roadmaps now available",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Auto-rotate education tips
    const interval = setInterval(() => {
      setActiveEducationTip((prev) => (prev + 1) % educationTips.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [educationTips.length]);

  const toggleMenu = () => setShowMenu(!showMenu);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const expandSearch = () => {
    setIsSearchFocused(true);
    searchInputRef.current?.focus();
  };

  // Advanced Floating learning elements with parallax effect
  const FloatingElements = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 0.5 + 0.8,
              x: [0, Math.random() * 10 - 5],
              y: [0, Math.random() * 10 - 5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 6 === 0 ? (
              <TbBrain className="text-purple-400" />
            ) : i % 6 === 1 ? (
              <TbSchool className="text-blue-400" />
            ) : i % 6 === 2 ? (
              <FaBook className="text-green-400" />
            ) : i % 6 === 3 ? (
              <TbSparkles className="text-yellow-400" />
            ) : i % 6 === 4 ? (
              <FaStar className="text-pink-400" />
            ) : (
              <FaRocket className="text-orange-400" />
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  // Animated logo component
  const AnimatedLogo = () => {
    return (
      <div className="font-serif text-4xl md:text-5xl relative overflow-hidden group">
        <motion.span
          className="text-purple-500 inline-block"
          initial={{ y: 0 }}
          whileHover={{
            y: [-2, 2, -2],
            transition: { duration: 0.5, repeat: Infinity },
          }}
        >
          S
        </motion.span>
        <motion.span
          className="text-purple-500 inline-block"
          initial={{ y: 0 }}
          whileHover={{
            y: [-2, 2, -2],
            transition: { duration: 0.5, delay: 0.05, repeat: Infinity },
          }}
        >
          k
        </motion.span>
        <motion.span
          className="text-purple-500 inline-block"
          initial={{ y: 0 }}
          whileHover={{
            y: [-2, 2, -2],
            transition: { duration: 0.5, delay: 0.1, repeat: Infinity },
          }}
        >
          i
        </motion.span>
        <motion.span
          className="text-purple-500 inline-block"
          initial={{ y: 0 }}
          whileHover={{
            y: [-2, 2, -2],
            transition: { duration: 0.5, delay: 0.15, repeat: Infinity },
          }}
        >
          l
        </motion.span>
        <motion.span
          className="text-purple-500 inline-block"
          initial={{ y: 0 }}
          whileHover={{
            y: [-2, 2, -2],
            transition: { duration: 0.5, delay: 0.2, repeat: Infinity },
          }}
        >
          l
        </motion.span>
        <motion.span
          className="text-purple-500 inline-block"
          initial={{ y: 0 }}
          whileHover={{
            y: [-2, 2, -2],
            transition: { duration: 0.5, delay: 0.25, repeat: Infinity },
          }}
        >
          S
        </motion.span>
        <motion.span
          className="text-purple-500 inline-block"
          initial={{ y: 0 }}
          whileHover={{
            y: [-2, 2, -2],
            transition: { duration: 0.5, delay: 0.3, repeat: Infinity },
          }}
        >
          h
        </motion.span>
        <motion.span
          className="text-purple-500 inline-block"
          initial={{ y: 0 }}
          whileHover={{
            y: [-2, 2, -2],
            transition: { duration: 0.5, delay: 0.35, repeat: Infinity },
          }}
        >
          a
        </motion.span>
        <motion.span
          className="text-purple-500 inline-block"
          initial={{ y: 0 }}
          whileHover={{
            y: [-2, 2, -2],
            transition: { duration: 0.5, delay: 0.4, repeat: Infinity },
          }}
        >
          r
        </motion.span>
        <motion.span
          className="text-purple-500 inline-block"
          initial={{ y: 0 }}
          whileHover={{
            y: [-2, 2, -2],
            transition: { duration: 0.5, delay: 0.45, repeat: Infinity },
          }}
        >
          e
        </motion.span>
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute -top-1 right-0 h-0.5 bg-gradient-to-l from-purple-600 via-pink-500 to-indigo-400"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="absolute -right-4 top-0 text-lg text-pink-500"
          animate={{
            rotate: [0, 360],
            opacity: [1, 0.7, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✦
        </motion.span>
      </div>
    );
  };

  // Animated education tip component
  const AnimatedEducationTip = () => {
    const currentTip = educationTips[activeEducationTip];

    return (
      <motion.div
        key={activeEducationTip}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 text-sm md:text-base"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentTip.icon}
        </motion.div>
        <span className="font-medium">{currentTip.title}:</span>
        <span>{currentTip.description}</span>
      </motion.div>
    );
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Education Tip Banner with advanced animation */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 text-white overflow-hidden relative">
        <FloatingElements />
        <div className="container mx-auto px-6 lg:px-16 py-2 relative">
          <AnimatePresence mode="wait">
            <AnimatedEducationTip />
          </AnimatePresence>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-4 flex justify-between items-center">
        <AnimatedLogo />

        {/* Desktop Navigation with enhanced hover animations */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-lg font-medium">
            {Navlinks.map(({ id, name, link }) => (
              <motion.li
                key={id}
                onHoverStart={() => setHoveredNavItem(id)}
                onHoverEnd={() => setHoveredNavItem(null)}
                className="relative py-2"
              >
                <a
                  href={link}
                  className={`${
                    scrolled ? "text-gray-800" : "text-gray-800"
                  } transition-colors duration-300 relative`}
                >
                  {name}
                  {hoveredNavItem === id && (
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      layoutId="navIndicator"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
                {hoveredNavItem === id && (
                  <motion.span
                    className="absolute -top-1 text-xs text-purple-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <TbSparkles />
                  </motion.span>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Search Bar & User Actions with enhanced animations */}
        <div className="hidden md:flex items-center gap-6">
          <motion.div
            className="relative"
            initial={{ width: "200px" }}
            animate={{ width: isSearchFocused ? "280px" : "200px" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search courses..."
              className={`p-2 pl-10 w-full border ${
                isSearchFocused ? "border-purple-400" : "border-gray-200"
              } rounded-full focus:ring-2 focus:ring-purple-400 transition-all duration-300`}
              initial={{ boxShadow: "0 0 0 rgba(167, 139, 250, 0)" }}
              animate={{
                boxShadow: isSearchFocused
                  ? "0 0 15px rgba(167, 139, 250, 0.3)"
                  : "0 0 0 rgba(167, 139, 250, 0)",
              }}
            />
            <motion.div
              className="absolute left-3 top-3 cursor-pointer"
              onClick={expandSearch}
              whileTap={{ scale: 0.9 }}
              animate={{
                rotate: isSearchFocused ? [0, 45, 0, -45, 0] : 0,
                scale: isSearchFocused ? [1, 1.2, 1] : 1,
                color: isSearchFocused ? "#9333ea" : "#9ca3af",
              }}
              transition={{ duration: isSearchFocused ? 0.5 : 0.2 }}
            >
              <FaSearch />
            </motion.div>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.button
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 text-white px-5 py-2 rounded-full hover:shadow-lg transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaUserCircle className="text-xl" />
              </motion.div>
              <a href="/login" className="relative overflow-hidden group">
                <span className="inline-block transition-transform group-hover:translate-y-full duration-300">
                  Sign In
                </span>
                <span className="absolute top-0 left-0 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  Join Now
                </span>
              </a>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Button with enhanced animations */}
        <div className="md:hidden flex items-center gap-4">
          <motion.div
            onClick={toggleMenu}
            className="p-2 bg-purple-100 rounded-full cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.1, backgroundColor: "#e9d5ff" }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {showMenu ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiMenuAlt1 className="text-2xl text-purple-800" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiMenuAlt3 className="text-2xl text-purple-800" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu - Enhanced with animations */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="md:hidden bg-white overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="container mx-auto px-6 py-4">
              <motion.ul
                className="flex flex-col gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.07 } },
                  hidden: {},
                }}
              >
                {Navlinks.map(({ id, name, link }, index) => (
                  <motion.li
                    key={id}
                    variants={{
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        },
                      },
                      hidden: { opacity: 0, x: -50 },
                    }}
                    className="overflow-hidden"
                  >
                    <a
                      href={link}
                      className="block text-lg font-medium text-gray-800 hover:text-purple-500 transition-colors duration-300 py-2 border-b border-gray-100"
                    >
                      <motion.div
                        className="flex items-center"
                        whileHover={{ x: 10 }}
                      >
                        <span className="mr-2 text-purple-500">
                          0{index + 1}.
                        </span>
                        {name}
                        <motion.span
                          className="ml-auto text-purple-300"
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: index * 0.1,
                          }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-6 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full p-2 pl-10 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                />
                <div className="absolute left-3 top-3">
                  <FaSearch className="text-gray-400" />
                </div>
              </motion.div>

              <motion.button
                className="mt-4 flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 w-full justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FaUserCircle className="text-xl" />
                <a href="/login" className="w-full text-center font-medium">
                  Sign In / Register
                </a>
              </motion.button>

              {/* Educational Quick Links with enhanced animations */}
              <motion.div
                className="mt-6 border-t pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-medium text-lg mb-3 text-gray-800 flex items-center">
                  <TbSparkles className="mr-2 text-purple-500" />
                  Learning Resources
                </h3>
                <motion.div
                  className="grid grid-cols-2 gap-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.1, delayChildren: 0.6 },
                    },
                    hidden: {},
                  }}
                >
                  {[
                    {
                      icon: <FaBook className="text-purple-500" />,
                      text: "All Courses",
                      link: "/#courses",
                      bg: "bg-purple-50",
                    },
                    {
                      icon: <FaChalkboardTeacher className="text-green-500" />,
                      text: "Live Classes",
                      link: "/#live-classes",
                      bg: "bg-green-50",
                    },
                    {
                      icon: <TbCertificate className="text-yellow-500" />,
                      text: "Certifications",
                      link: "/#certifications",
                      bg: "bg-yellow-50",
                    },
                    {
                      icon: <FaGraduationCap className="text-blue-500" />,
                      text: "Career Paths",
                      link: "/#career-paths",
                      bg: "bg-blue-50",
                    },
                    {
                      icon: <TbDeviceDesktop className="text-red-500" />,
                      text: "Workshops",
                      link: "/#workshops",
                      bg: "bg-red-50",
                    },
                    {
                      icon: <TbAward className="text-indigo-500" />,
                      text: "Challenges",
                      link: "/#challenges",
                      bg: "bg-indigo-50",
                    },
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.link}
                      className={`flex items-center gap-2 p-3 ${item.bg} rounded-lg transition-all duration-300`}
                      variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 20 },
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </motion.a>
                  ))}
                </motion.div>

                {/* Hot course section */}
                <motion.div
                  className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex items-center mb-2">
                    <FaFire className="text-orange-500 mr-2" />
                    <h4 className="font-medium">Trending Now</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    "AI for Everyone: Build Your First ML Model" - Over 5,000
                    students enrolled this week!
                  </p>
                  <motion.button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Trending Course
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
