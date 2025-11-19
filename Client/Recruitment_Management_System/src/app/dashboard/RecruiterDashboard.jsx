import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button/Button';
import Header from '../../components/organisms/Header/Header';
import Sidebar from '../../components/organisms/Sidebar/Sidebar';
import DashboardGrid from '../../components/organisms/DashboardGrid/DashboardGrid';
import './Dashboard.css';

const RecruiterDashboard = () => {
  // const [user] = useState(() => {
  //   const userData = localStorage.getItem('user');
  //   return userData ? JSON.parse(userData) : null;
  // });
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/auth');
  //   }
  // }, [user, navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   navigate('/');
  // };

  // if (!user) return <div>Loading...</div>;

  const dashboardCards = [
    {
      icon: 'fas fa-plus',
      title: 'Post Job',
      description: 'Create new job postings to attract candidates',
      onClick: () => console.log('Post Job clicked')
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Manage Jobs',
      description: 'View and edit your active job postings',
      onClick: () => console.log('Manage Jobs clicked')
    },
    {
      icon: 'fas fa-users',
      title: 'Candidates',
      description: 'Review applications and candidate profiles',
      onClick: () => console.log('Candidates clicked')
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Interviews',
      description: 'Schedule and manage candidate interviews',
      onClick: () => console.log('Interviews clicked')
    }
  ];

  const recruiterNav = [
    {
      label: "Jobs",
      items: [
        { label: "All Jobs", href: "/recruiter/jobs", icon: "fas fa-briefcase" },
        { label: "Create Job", href: "/recruiter/jobs/create", icon: "fas fa-plus" },
      ],
    },
    {
      label: "Applications",
      items: [
        { label: "All Applications", href: "/recruiter/applications", icon: "fas fa-file-alt" },
        { label: "By Job", href: "/recruiter/applications/by-job", icon: "fas fa-filter" },
      ],
    },
    {
      label: "Interviews",
      items: [
        { label: "My Interviews", href: "/recruiter/interviews", icon: "fas fa-calendar" },
        { label: "Schedule Interview", href: "/recruiter/interviews/schedule", icon: "fas fa-calendar-plus" },
      ],
    },
    {
      label: "Profile",
      items: [
        { label: "My Profile", href: "/recruiter/profile", icon: "fas fa-user" },
        { label: "Logout", href: "/", icon: "fas fa-sign-out-alt" },
      ],
    },
  ];

  // const handleNavigation = (item) => {
  //   if (item.label === 'Logout') {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('user');
  //     navigate('/');
  //   }
  // };

  return (
    <div className="dashboard">
      <Header navigationItems={recruiterNav} showAuthButtons={false} />
      {/* <Sidebar navigationItems={recruiterNav} />{/* onNavigate={handleNavigation} */}  
      <main className="dashboard-main">
        <div className="dashboard-content">
          <DashboardGrid cards={dashboardCards} />

          <div className="dashboard-right">
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
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;