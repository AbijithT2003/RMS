import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Header from "../../../components/organisms/Header/Header";
import TestimonialCarousel from "../../../components/organisms/TestimonialCarousel/TestimonialCarousel";
import Button from "../../../components/atoms/Button/Button";

const LandingPage = () => {
  const testimonials = [
    {
      image: "/assets/images/christian-buehner-DItYlc26zVI-unsplash.jpg",
      name: "John Doe",
      title: "Senior Developer",
      testimonial:
        "This platform transformed how we recruit talent. Finding the right candidates has never been easier!",
    },
    {
      image: "/assets/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg",
      name: "Sarah Smith",
      title: "HR Manager",
      testimonial:
        "Streamlined our entire hiring process. We've cut recruitment time in half with this amazing tool.",
    },
    {
      image: "/assets/images/craig-mckay-jmURdhtm7Ng-unsplash.jpg",
      name: "Mike Johnson",
      title: "Hiring Lead",
      testimonial:
        "The best recruitment management system we've used. Highly recommended for any growing team!",
    },
    {
      image: "/assets/images/jurica-koletic-7YVZYZeITc8-unsplash.jpg",
      name: "Emma Wilson",
      title: "Talent Recruiter",
      testimonial:
        "Outstanding experience! The interface is intuitive and the features are exactly what we needed.",
    },
    {
      image: "/assets/images/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg",
      name: "David Brown",
      title: "Operations Manager",
      testimonial:
        "A game-changer for our organization. The support team is responsive and helpful.",
    },
  ];

  const navigate = useNavigate();

  // Handlers for login and register
  const handleLogin = () => {
    navigate("/auth?mode=login");
  };

  const handleRegister = () => {
    navigate("/auth?mode=register");
  };

  return (
    <div>
      <Header onLogin={handleLogin} onRegister={handleRegister} />
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>The Leap for "BETTER FUTURE"</h1>
          <p>
            Connect with top companies and discover opportunities that match
            your skills and career goals
          </p>
          <div className="cta-buttons">
            <Button variant="primary" size="large" onClick={handleRegister}>
              <i className="fas fa-rocket"></i>
              Get Started
            </Button>
            <Button variant="secondary" size="large">
              <i className="fas fa-info-circle"></i>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/*  Testimonials Carousel */}
      <section className="testimonials-carousel-section">
        <div className="container">
          <h2>What Our Users Say</h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
