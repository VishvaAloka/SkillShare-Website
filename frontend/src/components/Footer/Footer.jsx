import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";

const Footer = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate calendar days (remains the same as in the original code)
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-white/30"></div>);
    }

    // Add actual days of the month
    for (let day = 1; day <= lastDate; day++) {
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`text-center p-1 w-full hover:bg-[#64ffda]/20 ${
            isToday ? "bg-[#64ffda] text-black font-bold rounded" : "text-white"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // Handle date click
  const handleDateClick = (day) => {
    console.log(`Clicked on day: ${day}`);
  };

  // Month navigation
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Navigation items with more detailed configuration
  const navigationItems = [
    {
      label: "HOME",
      href: "/#",
      icon: "fa-solid fa-home",
      description: "Go to Homepage",
    },
    {
      label: "COURSES",
      href: "/course",
      icon: "fa-solid fa-graduation-cap",
      description: "Explore Our Courses",
    },
    {
      label: "FEEDBACK",
      href: "/Feedback",
      icon: "fa-solid fa-comments",
      description: "Interactive Learning",
    },
    {
      label: "PAYMENT",
      href: "/payment",
      icon: "fa-solid fa-credit-card", // Changed from fa-book-open to fa-credit-card
      description: "Payment", // Changed from "Study Materials" to "Payment"
    },
    {
      label: "COMMUNITY",
      href: "/community",
      icon: "fa-solid fa-users",
      description: "Connect & Learn",
    },
    {
      label: "ABOUT",
      href: "/about",
      icon: "fa-solid fa-circle-info",
      description: "About SkillShare",
    },
    {
      label: "HELP",
      href: "/tickets",
      icon: "fa-solid fa-life-ring",
      description: "Support Center",
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-[#0a2342] text-white py-10 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Logo, Quote, and Contact Information */}
          <div className="relative md:border-r border-white/20 pr-6">
            <div className="font-serif text-4xl md:text-5xl mb-4">
              SkillShare
              <i
                className="fa-sharp fa-thin fa-copyright text-sm ml-2"
                style={{ color: "#A855F7" }}
              ></i>
            </div>

            <p className="font-serif italic text-base md:text-lg mb-6 text-white/90 leading-relaxed">
              "Empowering students with quality education. Making learning
              accessible, engaging, and effective for everyone."
            </p>

            <button className="border border-white/30 hover:border-white/60 text-white px-4 py-2 rounded-lg flex items-center mb-6">
              BECOME AN INSTRUCTOR
              <i
                className="fa-duotone fa-arrow-right animate-pulse ml-2"
                style={{ color: "#64ffda" }}
              ></i>
            </button>

            {/* Contact Information Moved Here */}
            <div className="border border-white/30 rounded-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-[#64ffda]">
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fa-solid fa-phone text-[#4A90E2] mr-3"></i>
                  <span className="text-base">Support:+94 774791374</span>
                </div>

                <div className="flex items-center">
                  <i className="fa-solid fa-envelope text-[#4A90E2] mr-3"></i>
                  <span className="text-base">skillshare@gmail.com</span>
                </div>

                <div className="flex items-center">
                  <i className="fa-solid fa-location-dot text-[#4A90E2] mr-3"></i>
                  <span className="text-base">OnegallFace Road, Colombo</span>
                </div>
              </div>
            </div>

            <div className="text-xs mt-8 text-white/70 flex items-center">
              <i
                className="fa-sharp fa-thin fa-copyright text-sm mr-2"
                style={{ color: "#ffffff" }}
              ></i>
              2025 SkillShare, Inc
            </div>
          </div>

          {/* Middle Column - Navigation and Resources */}
          <div className="space-y-8">
            {/* Stylish Navigation - Two Columns */}
            <div className="grid grid-cols-2 gap-4">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group relative overflow-hidden p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="flex items-center relative z-10">
                    <i
                      className={`${item.icon} mr-4 text-[#64ffda] text-xl transition-transform group-hover:rotate-6`}
                    ></i>
                    <div>
                      <div className="font-semibold text-white group-hover:text-[#64ffda] transition-colors">
                        {item.label}
                      </div>
                      <div className="text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.description}
                      </div>
                    </div>
                    <i className="fa-solid fa-arrow-right ml-auto text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  </div>
                </a>
              ))}
            </div>

            {/* Study Resources */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#64ffda]">
                  Study Resources
                </h4>
                {[
                  "Subjects",
                  "Past Papers",
                  "Model Papers",
                  "Video Tutorials",
                  "Study Notes",
                ].map((resource, index) => (
                  <a
                    key={index}
                    href={`/resources/${resource
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    className="block text-white/80 hover:text-white mb-2"
                  >
                    <i className="fa-solid fa-book mr-2"></i>
                    {resource}
                  </a>
                ))}
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#64ffda]">
                  Support Hours
                </h4>
                <div className="text-white/80">
                  <p className="mb-2">
                    <i className="fa-solid fa-clock mr-2"></i>
                    Monday - Friday: 8:00 AM - 8:00 PM
                  </p>
                  <p className="mb-2">
                    <i className="fa-solid fa-clock mr-2"></i>
                    Saturday: 9:00 AM - 5:00 PM
                  </p>
                  <p>
                    <i className="fa-solid fa-clock mr-2"></i>
                    Sunday: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center space-x-3 mt-6">
              {[
                "twitter",
                "linkedin",
                "instagram",
                "facebook",
                "youtube",
                "discord",
                "github",
              ].map((social, index) => (
                <button
                  key={index}
                  className="bg-[#3a506b] hover:bg-[#1c2541] rounded-full h-8 w-8 flex items-center justify-center animate-pulse hover:animate-none"
                >
                  <i className={`fa-brands fa-${social} text-white`}></i>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Calendar and Additional Components */}
          <div className="flex flex-col items-center justify-center">
            {/* Calendar Component */}
            <div className="border border-white/30 rounded-md p-6 w-full max-w-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => changeMonth(-1)}
                  className="text-white/70 hover:text-white"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h3 className="text-center font-medium">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={() => changeMonth(1)}
                  className="text-white/70 hover:text-white"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="text-white/70">
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-1 text-xs">
                {generateCalendarDays()}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="border border-white/30 rounded-md p-6 w-full max-w-md mb-6">
              <h3 className="text-left font-medium mb-4">Stay Updated</h3>

              <div className="flex">
                <input
                  placeholder="Your email here"
                  className="rounded-r-none bg-white/10 border-white/20 text-white px-3 py-2 flex-1"
                />
                <button className="rounded-l-none bg-[#5e8b7e] hover:bg-[#2c6e49] px-4 py-2 text-white">
                  Subscribe
                  <i className="fa-solid fa-paper-plane animate-pulse ml-2"></i>
                </button>
              </div>
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-col w-full max-w-md">
              <h3 className="text-left font-medium mb-4">Download Our App</h3>
              <div className="flex space-x-4">
                <button className="bg-black/80 hover:bg-black text-white px-4 py-2 rounded-lg flex items-center">
                  <i className="fa-brands fa-apple text-2xl mr-2"></i>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </button>
                <button className="bg-black/80 hover:bg-black text-white px-4 py-2 rounded-lg flex items-center">
                  <i className="fa-brands fa-google-play text-2xl mr-2"></i>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
