import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button/Button';
import './Dashboard.css';

const RecruiterDashboard = () => {
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
          <h1>Recruiter Dashboard</h1>
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
                <i className="fas fa-plus"></i>
              </div>
              <h3>Post Job</h3>
              <p>Create new job postings to attract candidates</p>
              <Button variant="primary" size="medium">
                Create Job
              </Button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Manage Jobs</h3>
              <p>View and edit your active job postings</p>
              <Button variant="primary" size="medium">
                View Jobs
              </Button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Candidates</h3>
              <p>Review applications and candidate profiles</p>
              <Button variant="primary" size="medium">
                View Candidates
              </Button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Interviews</h3>
              <p>Schedule and manage candidate interviews</p>
              <Button variant="primary" size="medium">
                Manage Interviews
              </Button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>12</h3>
              <p>Active Jobs</p>
            </div>
            <div className="stat-card">
              <h3>48</h3>
              <p>Applications</p>
            </div>
            <div className="stat-card">
              <h3>8</h3>
              <p>Interviews Scheduled</p>
            </div>
            <div className="stat-card">
              <h3>3</h3>
              <p>Offers Made</p>
            </div>
          </div>

          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <i className="fas fa-user-plus"></i>
                <span>New application for Senior Developer position</span>
                <small>1 hour ago</small>
              </div>
              <div className="activity-item">
                <i className="fas fa-calendar-plus"></i>
                <span>Interview scheduled with John Doe</span>
                <small>3 hours ago</small>
              </div>
              <div className="activity-item">
                <i className="fas fa-briefcase"></i>
                <span>Posted new Frontend Developer job</span>
                <small>1 day ago</small>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;