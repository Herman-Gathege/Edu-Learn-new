import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="text-center mt-5">
        <h1>Welcome to EduLearn</h1>
        <img src="hero.jpeg" alt="Hero" className="img-fluid rounded mb-4" />
        <p className="text-dark">
          Learn and grow with our expertly curated courses designed just for
          you!
        </p>    
        <Link to="/courses">
        <button className="btn btn-success btn-lg mt-3">Get Started</button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="mt-5">
        <h2 className="text-center">Why Choose EduLearn?</h2>
        <div className="row text-center mt-4">
          <div className="col-md-4">
            <img
              src="expert.jpeg"
              alt="Expert Instructors"
              className="img-fluid rounded mb-3"
            />
            <h4>Expert Instructors</h4>
            <p>Learn from industry professionals with years of experience.</p>
          </div>
          <div className="col-md-4">
            <img
              src="growth.jpeg"
              alt="Career Growth"
              className="img-fluid rounded mb-3"
            />
            <h4>Career Growth</h4>
            <p>Upskill yourself and take your career to the next level.</p>
          </div>
          <div className="col-md-4">
            <img
              src="global3.jpeg"
              alt="Global Community"
              className="img-fluid rounded mb-3"
            />
            <h4>Global Community</h4>
            <p>Join a network of learners from around the world.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-5 bg-light py-5">
        <h2 className="text-center">What Our Users Say</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <img
              src="jane.jpeg"
              alt="Jane Apiyo"
              className="img-fluid rounded-circle mb-3"
              style={{ maxWidth: "150px" }}
            />
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                "EduLearn helped me land my dream job! The courses are
                top-notch."
              </p>
              <footer className="blockquote-footer mt-2">Jane Apiyo</footer>
            </blockquote>
          </div>
          <div className="col-md-4">
            <img
              src="john.jpeg"
              alt="John Smith"
              className="img-fluid rounded-circle mb-3"
              style={{ maxWidth: "150px" }}
            />
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                "The instructors are amazing and the content is very engaging."
              </p>
              <footer className="blockquote-footer mt-2">John Smith</footer>
            </blockquote>
          </div>
          <div className="col-md-4">
            <img
              src="emily.jpeg"
              alt="Emily Johnson"
              className="img-fluid rounded-circle mb-3"
              style={{ maxWidth: "150px" }}
            />
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                "I loved the flexibility of learning at my own pace."
              </p>
              <footer className="blockquote-footer mt-2">Emily Johnson</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center mb-5">
        <h2>Start Your Learning Journey Today</h2>
        <img
          src="start.jpeg"
          alt="Call to Action"
          className="img-fluid rounded mb-4"
        />
        <p className="text-muted">
          Sign up now and unlock access to hundreds of courses.
        </p>
        <Link to="/signup">
          <button className="btn btn-success btn-lg">Sign Up</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
