import React from 'react';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Find Your Dream Job Today</h1>
          <p>Connect with top companies and discover opportunities that match your skills and career goals</p>
          
          <div className="search-bar">
            <input 
              className="search-input"
              type="text"
              placeholder="Search jobs, companies, or skills..."
            />
            <button className="btn btn-primary">
              <i className="fas fa-search"></i> Search
            </button>
          </div>
          
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
    </div>
  );
};

export default LandingPage;