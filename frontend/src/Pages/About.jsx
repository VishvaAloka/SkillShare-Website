import React from "react";
import { FaChalkboardTeacher, FaBookOpen, FaCertificate } from "react-icons/fa";
import educationImage from "../assets/slide_2.jpg";

const About = () => {
  return (
    <div className="dark:bg-white bg-slate-100 min-h-screen flex items-center duration-300 -mt-6">
      <div className="container mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div data-aos="fade-right" data-aos-duration="1500">
            <img
              src={educationImage}
              alt="Online Learning"
              className="w-full max-h-[350px] object-cover rounded-xl shadow-lg"
            />
          </div>
          <div>
            <div className="space-y-6">
              <h1
                data-aos="fade-up"
                className="text-4xl font-bold font-serif dark:text-black"
              >
                Empowering Learning with SkillShare
              </h1>
              <p data-aos="fade-up" className="leading-7 text-gray-700">
                Join a global community of learners and educators. Explore
                courses on design, development, business, and more—tailored to
                help you gain new skills and advance in your career.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div
                  data-aos="zoom-in"
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col items-center"
                >
                  <FaChalkboardTeacher className="text-5xl text-blue-600 dark:text-blue-400 animate-bounce" />
                  <h3 className="text-lg font-semibold mt-4">
                    Expert Instructors
                  </h3>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-delay="200"
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col items-center"
                >
                  <FaBookOpen className="text-5xl text-green-600 dark:text-green-400 animate-bounce" />
                  <h3 className="text-lg font-semibold mt-4">
                    Diverse Courses
                  </h3>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-delay="400"
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col items-center"
                >
                  <FaCertificate className="text-5xl text-red-600 dark:text-red-400 animate-bounce" />
                  <h3 className="text-lg font-semibold mt-4">
                    Certified Learning
                  </h3>
                </div>
              </div>
              <button
                data-aos="fade-up"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
