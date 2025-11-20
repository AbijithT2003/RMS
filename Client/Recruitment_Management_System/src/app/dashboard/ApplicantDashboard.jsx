// import React, { useState } from 'react';
import DashboardContainer from '../../components/DashboardContainer';
import DashboardGrid from '../../components/organisms/DashboardGrid/DashboardGrid';
import DashboardView from '../../components/common/DashboardView';
import { JobListPage, MyApplicationsPage, MyInterviewsPage, ApplicantProfilePage, SavedJobsPage } from '../../pages';
import './Dashboard.css';

const ApplicantDashboard = () => {
  const applicantNav = [
    {
      label: "Jobs",
      items: [
        { label: "Browse Jobs", view: "jobs", icon: "fas fa-search" },
        { label: "Saved Jobs", view: "saved-jobs", icon: "fas fa-heart" },
        { label: "My Applications", view: "applications", icon: "fas fa-file-alt" },
      ],
    },
    {
      label: "Profile",
      items: [
        { label: "My Profile", view: "profile", icon: "fas fa-user" },
        { label: "Interviews", view: "interviews", icon: "fas fa-calendar" },
        { label: "Logout", icon: "fas fa-sign-out-alt" ,},
      ],
    },
  ];

  const renderView = (activeView, setActiveView) => {
    const dashboardCards = [
      {
        icon: "fas fa-search",
        title: "Job Search",
        description: "Browse and apply to available positions",
        onClick: () => setActiveView("jobs"),
      },
      {
        icon: "fas fa-heart",
        title: "Saved Jobs",
        description: "View your bookmarked job opportunities",
        onClick: () => setActiveView("saved-jobs"),
      },
      {
        icon: "fas fa-file-alt",
        title: "My Applications",
        description: "Track your job applications and status",
        onClick: () => setActiveView("applications"),
      },
      {
        icon: "fas fa-calendar",
        title: "Interviews",
        description: "Manage your upcoming interviews",
        onClick: () => setActiveView("interviews"),
      },
      {
        icon: "fas fa-user",
        title: "Profile",
        description: "Update your resume and personal information",
        onClick: () => setActiveView("profile"),
      },
    ];

    const getBreadcrumbs = (view) => [
      { label: "Dashboard", onClick: () => setActiveView("dashboard") },
      { label: getViewTitle(view) },
    ];

    const getViewTitle = (view) => {
      switch (view) {
        case "jobs":
          return "Browse Jobs";
        case "saved-jobs":
          return "Saved Jobs";
        case "applications":
          return "My Applications";
        case "interviews":
          return "My Interviews";
        case "profile":
          return "My Profile";
        default:
          return "Dashboard";
      }
    };
    // Add application statistics
    const applicationStats = [
      { status: "Applied", count: 5, color: "#blue" },
      { status: "Under Review", count: 2, color: "#orange" },
      { status: "Interviews", count: 1, color: "#green" },
    ];

    switch (activeView) {
      case "jobs":
        return (
          <DashboardView
            title="Browse Jobs"
            breadcrumbs={getBreadcrumbs("jobs")}
          >
            <JobListPage />
          </DashboardView>
        );
      case "saved-jobs":
        return (
          <DashboardView
            title="Saved Jobs"
            breadcrumbs={getBreadcrumbs("saved-jobs")}
          >
            <SavedJobsPage />
          </DashboardView>
        );
      case "applications":
        return (
          <DashboardView
            title="My Applications"
            breadcrumbs={getBreadcrumbs("applications")}
          >
            <MyApplicationsPage />
          </DashboardView>
        );
      case "interviews":
        return (
          <DashboardView
            title="My Interviews"
            breadcrumbs={getBreadcrumbs("interviews")}
          >
            <MyInterviewsPage />
          </DashboardView>
        );
      case "profile":
        return (
          <DashboardView
            title="My Profile"
            breadcrumbs={getBreadcrumbs("profile")}
          >
            <ApplicantProfilePage />
          </DashboardView>
        );
      default:
        return (
          <div className="dashboard-content">
            <div className="dashboard-top">
              <DashboardGrid cards={dashboardCards} />
            </div>
            <div className="dashboard-bottom">
              <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <i className="fas fa-plus-circle"></i>
                    <span>
                      Applied to Software Engineer position at TechCorp
                    </span>
                    <small>2 hours ago</small>
                  </div>
                  <div className="activity-item">
                    <i className="fas fa-calendar-check"></i>
                    <span>Interview scheduled for Frontend Developer role</span>
                    <small>1 day ago</small>
                  </div>
                </div>
              </div>
              // Show in dashboard
              <div className="stats-section">
                <h3>Your Application Stats</h3>
                {applicationStats.map((stat) => (
                  <div key={stat.status} className="stat">
                    {stat.status}: {stat.count}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardContainer navigationItems={applicantNav}>
      {renderView}
    </DashboardContainer>
  );
};

export default ApplicantDashboard;