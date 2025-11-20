import React from 'react';
import DashboardContainer from '../../components/DashboardContainer';
import DashboardGrid from '../../components/organisms/DashboardGrid/DashboardGrid';
import DashboardView from '../../components/common/DashboardView';
import { ManageJobsPage, CreateJobPage, ManageApplicationsPage, MyInterviewsPage, InterviewSchedulePage } from '../../pages';
import './Dashboard.css';
import '../../components/common/Dashboard.css';

const RecruiterDashboard = () => {
  const recruiterNav = [
    {
      label: "Jobs",
      items: [
        { label: "All Jobs", view: "jobs", icon: "fas fa-briefcase" },
        { label: "Create Job", view: "create-job", icon: "fas fa-plus" },
      ],
    },
    {
      label: "Applications",
      items: [
        { label: "All Applications", view: "applications", icon: "fas fa-file-alt" },
        { label: "My Interviews", view: "interviews", icon: "fas fa-calendar" },
        { label: "Schedule Interview", view: "schedule", icon: "fas fa-calendar-plus" },
      ],
    },
    {
      label: "Profile",
      items: [
        { label: "Logout", icon: "fas fa-sign-out-alt" },
      ],
    },
  ];

  const renderView = (activeView, setActiveView) => {
    const dashboardCards = [
      {
        icon: 'fas fa-plus',
        title: 'Post Job',
        description: 'Create new job postings to attract candidates',
        onClick: () => setActiveView('create-job')
      },
      {
        icon: 'fas fa-briefcase',
        title: 'Manage Jobs',
        description: 'View and edit your active job postings',
        onClick: () => setActiveView('jobs')
      },
      {
        icon: 'fas fa-users',
        title: 'Candidates',
        description: 'Review applications and candidate profiles',
        onClick: () => setActiveView('applications')
      },
      {
        icon: 'fas fa-calendar-alt',
        title: 'Interviews',
        description: 'Schedule and manage candidate interviews',
        onClick: () => setActiveView('interviews')
      }
    ];

    const getBreadcrumbs = (view) => [
      { label: 'Dashboard', onClick: () => setActiveView('dashboard') },
      { label: getViewTitle(view) }
    ];

    const getViewTitle = (view) => {
      switch (view) {
        case 'jobs': return 'Manage Jobs';
        case 'create-job': return 'Create Job';
        case 'applications': return 'Applications';
        case 'interviews': return 'Interviews';
        case 'schedule': return 'Schedule Interview';
        default: return 'Dashboard';
      }
    };

    switch (activeView) {
      case 'jobs': 
        return (
          <DashboardView title="Manage Jobs" breadcrumbs={getBreadcrumbs('jobs')}>
            <ManageJobsPage />
          </DashboardView>
        );
      case 'create-job': 
        return (
          <DashboardView title="Create New Job" breadcrumbs={getBreadcrumbs('create-job')}>
            <CreateJobPage />
          </DashboardView>
        );
      case 'applications': 
        return (
          <DashboardView title="Manage Applications" breadcrumbs={getBreadcrumbs('applications')}>
            <ManageApplicationsPage />
          </DashboardView>
        );
      case 'interviews': 
        return (
          <DashboardView title="My Interviews" breadcrumbs={getBreadcrumbs('interviews')}>
            <MyInterviewsPage />
          </DashboardView>
        );
      case 'schedule': 
        return (
          <DashboardView title="Schedule Interview" breadcrumbs={getBreadcrumbs('schedule')}>
            <InterviewSchedulePage />
          </DashboardView>
        );
      default:
        return (
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
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardContainer navigationItems={recruiterNav}>
      {renderView}
    </DashboardContainer>
  );
};

export default RecruiterDashboard;