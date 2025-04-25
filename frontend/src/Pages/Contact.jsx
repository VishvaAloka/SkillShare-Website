import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div id="contact" className="bg-white py-16">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-600" data-aos="fade-up">
            Get in Touch
          </h1>
          <p
            className="text-purple-500 mt-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We'd love to hear from you! Reach out for inquiries or
            collaborations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            data-aos="zoom-in"
            className="flex flex-col items-center bg-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <FaPhoneAlt className="text-5xl text-purple-500 animate-bounce" />
            <h3 className="text-xl font-semibold mt-4 text-purple-800">
              Call Us
            </h3>
            <p className="text-purple-600 mt-2">+94 774791374</p>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-delay="200"
            className="flex flex-col items-center bg-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <FaEnvelope className="text-5xl text-purple-500 animate-bounce" />
            <h3 className="text-xl font-semibold mt-4 text-purple-800">
              Email Us
            </h3>
            <p className="text-purple-600 mt-2">contact@skillshare.edu</p>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="flex flex-col items-center bg-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <FaMapMarkerAlt className="text-5xl text-purple-500 animate-bounce" />
            <h3 className="text-xl font-semibold mt-4 text-purple-800">
              Visit Us
            </h3>
            <p className="text-purple-600 mt-2">OnegallFace Road, Colombo</p>
          </div>
        </div>
        <div
          className="mt-12 text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <a
            href="#"
            className="inline-block font-semibold py-3 px-8 bg-purple-500 text-white rounded-lg hover:bg-purple-600 duration-200 tracking-widest uppercase transition-transform hover:scale-105"
          >
            Contact Us
          </a>
        </div>
        <div
          className="mt-16 max-w-2xl mx-auto p-8 bg-purple-50 rounded-lg shadow-lg"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-purple-800">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-white text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300 border border-purple-100"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-white text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300 border border-purple-100"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 h-32 rounded-lg bg-white text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300 border border-purple-100"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 duration-200 transition-transform hover:scale-[1.02]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
