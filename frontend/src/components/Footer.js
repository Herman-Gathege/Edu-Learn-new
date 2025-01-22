import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container text-center">
        <div className="row">
          {/* Navigation Links */}
          <div className="col-md-4">
            <h5>EduLearn</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/courses" className="text-white text-decoration-none">
                  Courses
                </a>
              </li>
              <li>
                <a href="/signup" className="text-white text-decoration-none">
                  Signup
                </a>
              </li>
              <li>
                <a href="/login" className="text-white text-decoration-none">
                  Login
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div>
              <a
                href="https://facebook.com"
                className="text-white text-decoration-none me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a
                href="https://twitter.com"
                className="text-white text-decoration-none me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a
                href="https://instagram.com"
                className="text-white text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p className="mb-0">support@edulearn.com</p>
            <p>+123 456 7890</p>
          </div>
        </div>
        <hr className="bg-white" />
        <p className="mb-0">&copy; 2024 EduLearn. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
