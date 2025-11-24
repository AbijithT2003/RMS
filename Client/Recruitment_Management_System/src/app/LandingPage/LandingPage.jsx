import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Header from "../../components/organisms/Header/Header";
import TestimonialCarousel from "../../components/organisms/TestimonialCarousel/TestimonialCarousel";
import Button from "../../components/atoms/Button/Button";
import Card from "../../components/ui/Card/Card";
import FeatureCard from "../../components/ui/Card/FeatureCard";
import Footer from "../../components/common/Footer/Footer";
import features from "./data/features";
import testimonials from "./data/testimonials";
import navigationItems from "./data/navigation";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth?mode=login");
  };

  const handleRegister = () => {
    navigate("/auth?mode=register");
  };

  return (
    <div>
      <Header
        onLogin={handleLogin}
        onRegister={handleRegister}
        navigationItems={navigationItems}
      />

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
            <Button variant="secondary" size="large" onClick={handleLogin}>
              <i className="fas fa-sign-in-alt"></i>
              login
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="testimonials-carousel-section">
        <div className="container">
          <h2>What Our Users Say</h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Our Key Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                id={feature.title.toLowerCase().replace(/\s+/g, "-")}
              >
                <FeatureCard
                  image={feature.image}
                  title={feature.title}
                  description={feature.description}
                  actionText={feature.actionText}
                  actionHref={feature.actionHref}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
