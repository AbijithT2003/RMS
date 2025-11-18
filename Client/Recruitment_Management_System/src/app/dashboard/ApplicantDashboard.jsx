import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button/Button';
import './Dashboard.css';

const ApplicantDashboard = () => {
  const [user] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>Applicant Dashboard</h1>
          <div className="header-actions">
            <span>Welcome, {user.name}</span>
            <Button variant="secondary" size="small" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>Job Search</h3>
              <p>Browse and apply to available positions</p>
              <Button variant="primary" size="medium">
                Search Jobs
              </Button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3>My Applications</h3>
              <p>Track your job applications and status</p>
              <Button variant="primary" size="medium">
                View Applications
              </Button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <i className="fas fa-calendar"></i>
              </div>
              <h3>Interviews</h3>
              <p>Manage your upcoming interviews</p>
              <Button variant="primary" size="medium">
                View Schedule
              </Button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <i className="fas fa-user"></i>
              </div>
              <h3>Profile</h3>
              <p>Update your resume and personal information</p>
              <Button variant="primary" size="medium">
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <i className="fas fa-plus-circle"></i>
                <span>Applied to Software Engineer position at TechCorp</span>
                <small>2 hours ago</small>
              </div>
              <div className="activity-item">
                <i className="fas fa-calendar-check"></i>
                <span>Interview scheduled for Frontend Developer role</span>
                <small>1 day ago</small>
              </div>
              <div className="activity-item">
                <i className="fas fa-edit"></i>
                <span>Updated profile information</span>
                <small>3 days ago</small>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicantDashboard;