import React from "react";
import "./LandingPage.css";
import Header from "../../../components/organisms/Header/Header";
import TestimonialCarousel from "../../../components/organisms/TestimonialCarousel/TestimonialCarousel";

const LandingPage = () => {
  const testimonials = [
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      name: "John Doe",
      title: "Senior Developer",
      testimonial:
        "This platform transformed how we recruit talent. Finding the right candidates has never been easier!",
    },
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      name: "Sarah Smith",
      title: "HR Manager",
      testimonial:
        "Streamlined our entire hiring process. We've cut recruitment time in half with this amazing tool.",
    },
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      name: "Mike Johnson",
      title: "Hiring Lead",
      testimonial:
        "The best recruitment management system we've used. Highly recommended for any growing team!",
    },
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      name: "Emma Wilson",
      title: "Talent Recruiter",
      testimonial:
        "Outstanding experience! The interface is intuitive and the features are exactly what we needed.",
    },
    {
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      name: "David Brown",
      title: "Operations Manager",
      testimonial:
        "A game-changer for our organization. The support team is responsive and helpful.",
    },
  ];

  // Handlers for login and register (placeholders)
  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleRegister = () => {
    console.log('Register clicked');
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
            <button className="btn btn-primary">
              <i className="fas fa-rocket"></i> Get Started
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-info-circle"></i> Learn More
            </button>
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
