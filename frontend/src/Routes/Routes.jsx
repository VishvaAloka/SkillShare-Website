import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Hero";
import Login from "../Pages/login";
import Signup from "../Pages/signup";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Services from "../Pages/Services";
import EDUCommunity from "../Pages/EDUCommunity";
import AdminUser from "../Pages/Admin_User";
import StudentProfile from "../Pages/StudentProfile";
import CreateTicket from "../components/CreateTicket";
import TicketView from "../components/TicketView";
import FeedbackPage from "../Pages/Feedback";
import CourseListing from "../Pages/CourseListing";
import CourseDetails from "../Pages/CourseDetails";
import Payment from "../Pages/PaymentPage";

const AppRoutes = () => {
  return (
    <div className="pt-16">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/community" element={<EDUCommunity />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/tickets" element={<TicketView />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/course" element={<CourseListing />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/payment" element={<Payment />} />

        <Route path="/signup" element={<Signup />} />
        {/* Protected Routes */}
        {/* ✅ Add Admin Route */}
        <Route path="/admin/users" element={<AdminUser />} />

        {/* 404 Route */}
      </Routes>
    </div>
  );
};

export default AppRoutes;
