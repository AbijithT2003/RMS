import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Header from "../../../components/organisms/Header/Header";
import TestimonialCarousel from "../../../components/organisms/TestimonialCarousel/TestimonialCarousel";
import Button from "../../../components/atoms/Button/Button";
import Card from "../../../components/ui/Card/Card";
import FeatureCard from "../../../components/ui/Card/FeatureCard";
import Footer from "../../../components/common/Footer/Footer";

const LandingPage = () => {
  const features = [
    {
      image: "/assets/images/jobposting.jpg",
      title: "Job Posting",
      description:
        "Create and manage job postings with ease. Reach the right candidates with targeted job descriptions and requirements.",
      actionText: "jobs",
      actionHref: "/features/job-posting",
    },
    {
      image: "/assets/images/candidatemangement.jpg",
      title: "Candidate Management",
      description:
        "Organize and track candidates throughout the hiring process with comprehensive candidate profiles and status tracking.",
      actionText: "Explore",
      actionHref: "/features/candidates",
    },
    {
      image: "/assets/images/interviewscheduling.jpg",
      title: "Interview Scheduling",
      description:
        "Schedule, conduct, and manage interviews seamlessly with our integrated calendar and video conferencing tools.",
      actionText: "Schedule",
      actionHref: "/features/interviews",
    },
    {
      image: "/assets/images/analytics.jpg",
      title: "Analytics",
      description:
        "Track recruitment metrics and gain insights to optimize your hiring process with detailed reports and dashboards.",
      actionText: "View",
      actionHref: "/features/analytics",
    },
    {
      image: "/assets/images/ApplicationsManagement.jpg",
      title: "Applications Management",
      description:
        "Manage applications efficiently by reviewing applicants, update statuses, assign recruiters, and track application progress.",
      actionText: "Applications",
      actionHref: "/features/ApplicationsManagement",
    },
    {
      image: "/assets/images/SkillManagement.jpg",
      title: "Skill Management",
      description:
        "Add and organize skills, match candidates with job requirements, and ensure better hiring decisions using detailed skill tracking.",
      actionText: "Skills",
      actionHref: "/features/SkillManagement",
    },
  ];

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
  ];const navigationItems = [
    {
      label: "Features",
      items: [
        { label: "Job Posting", href: "/features/job-posting" },
        { label: "Candidate Management", href: "/features/candidates" },
        { label: "Interview Scheduling", href: "/features/interviews" },
        { label: "Analytics", href: "/features/analytics" },
      ],
    },
    {
      label: "Solutions",
      items: [
        { label: "For Recruiters", href: "/solutions/recruiters" },
        { label: "For HR Teams", href: "/solutions/hr" },
        { label: "For Enterprises", href: "/solutions/enterprise" },
      ],
    },
    {
      label: "Departments",
      items: [
        { label: "Engineering", href: "/departments/engineering" },
        { label: "Sales", href: "/departments/sales" },
        { label: "Marketing", href: "/departments/marketing" },
        { label: "Operations", href: "/departments/operations" },
      ],
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
      <Header onLogin={handleLogin} onRegister={handleRegister} navigationItems={navigationItems} />
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

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Our Key Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                image={feature.image}
                title={feature.title}
                description={feature.description}
                actionText={feature.actionText}
                actionHref={feature.actionHref}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
