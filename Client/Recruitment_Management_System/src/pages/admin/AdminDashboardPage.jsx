import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/common/PageLayout';
import DashboardGrid from '../../components/organisms/DashboardGrid/DashboardGrid';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      icon: 'fas fa-users',
      title: 'User Management',
      description: 'Manage applicants and recruiters',
      onClick: () => navigate('/admin/users')
    },
    {
      icon: 'fas fa-cogs',
      title: 'Skills Management',
      description: 'Manage skills and categories',
      onClick: () => navigate('/admin/skills')
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Analytics',
      description: 'View system analytics and reports',
      onClick: () => console.log('Analytics clicked')
    },
    {
      icon: 'fas fa-settings',
      title: 'System Settings',
      description: 'Configure system settings',
      onClick: () => console.log('Settings clicked')
    }
  ];

  return (
    <PageLayout title="Admin Dashboard">
      <DashboardGrid cards={dashboardCards} />
      
      <div className="admin-stats">
        <h2>System Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>156</h3>
            <p>Total Users</p>
          </div>
          <div className="stat-card">
            <h3>24</h3>
            <p>Active Jobs</p>
          </div>
          <div className="stat-card">
            <h3>89</h3>
            <p>Applications</p>
          </div>
          <div className="stat-card">
            <h3>15</h3>
            <p>Interviews</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboardPage;