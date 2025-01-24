import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Adjust the path
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Courses from "./components/Courses";
import AddCourse from "./components/AddCourse";
import CourseDetail from "./components/CourseDetails";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/add-course" element={<AddCourse />} />{" "}
            {/* Add route for the add course page */}
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
