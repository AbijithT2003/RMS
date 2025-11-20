// import React, { useState } from 'react';
import DashboardContainer from '../../components/DashboardContainer';
import DashboardGrid from '../../components/organisms/DashboardGrid/DashboardGrid';
import DashboardView from '../../components/common/DashboardView';
import { JobListPage, MyApplicationsPage, MyInterviewsPage, ApplicantProfilePage, SavedJobsPage } from '../../pages';
import './Dashboard.css';
import { useApi } from "../../hooks/useApi";
import { applicationsApi } from "../../api/endpoints/applications.api";


const ApplicantDashboard = () => {
  const applicantNav = [
    {
      label: "Jobs",
      items: [
        { label: "Browse Jobs", view: "jobs", icon: "fas fa-search" },
        { label: "Saved Jobs", view: "saved-jobs", icon: "fas fa-heart" },
        {
          label: "My Applications",
          view: "applications",
          icon: "fas fa-file-alt",
        },
      ],
    },
    {
      label: "Profile",
      items: [
        { label: "My Profile", view: "profile", icon: "fas fa-user" },
        { label: "Interviews", view: "interviews", icon: "fas fa-calendar" },
        { label: "Logout", icon: "fas fa-sign-out-alt" },
      ],
    },
  ];

  const { data: applicationsData, loading: applicationsLoading } = useApi(() =>
    applicationsApi.getMyApplications()
  );

  const applications = applicationsData?.content || [];

  // Assuming `applications` is fetched via useApi
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
    .slice(0, 5); // latest 5 applications

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

    const applicationStats = [
      {
        status: "Applied",
        count: applications.filter((app) => app.status === "SUBMITTED").length,
        color: "#3498db",
      },
      {
        status: "Under Review",
        count: applications.filter((app) => app.status === "UNDER_REVIEW")
          .length,
        color: "#f39c12",
      },
      {
        status: "Shortlisted",
        count: applications.filter((app) => app.status === "SHORTLISTED")
          .length,
        color: "#2ecc71",
      },
      {
        status: "Interview Scheduled",
        count: applications.filter(
          (app) => app.status === "INTERVIEW_SCHEDULED"
        ).length,
        color: "#9b59b6",
      },
      {
        status: "Interviewed",
        count: applications.filter((app) => app.status === "INTERVIEWED")
          .length,
        color: "#16a085",
      },
      {
        status: "Selected",
        count: applications.filter((app) => app.status === "SELECTED").length,
        color: "#27ae60",
      },
      {
        status: "Rejected",
        count: applications.filter((app) => app.status === "REJECTED").length,
        color: "#e74c3c",
      },
    ];

    const statusIconMap = {
      SUBMITTED: "fas fa-hourglass-start",
      UNDER_REVIEW: "fas fa-search",
      SHORTLISTED: "fas fa-star",
      INTERVIEW_SCHEDULED: "fas fa-calendar-check",
      INTERVIEWED: "fas fa-user-check",
      SELECTED: "fas fa-check-circle",
      REJECTED: "fas fa-times-circle",
    };


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
                  {recentApplications.length === 0 ? (
                    <p>No recent activity</p>
                  ) : (
                    recentApplications.map((app) => (
                      <div key={app.id} className="activity-item">
                        <i className={statusIconMap[app.status]}></i>

                        <span>
                          Applied to <strong>{app.jobTitle}</strong> at{" "}
                          {app.recruiterName || "Unknown Company"}
                        </span>
                        <small>
                          {new Date(app.appliedAt).toLocaleString()}
                        </small>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="stats-section">
                <h3>Your Application Stats</h3>
                {applicationsLoading ? (
                  <p>Loading stats...</p>
                ) : (
                  <div className="stats-grid">
                    {applicationStats
                      .filter((stat) => stat.count > 0) // only show statuses with at least 1
                      .map((stat) => (
                        <div key={stat.status} className="stat-card">
                          <h3 style={{ color: stat.color }}>{stat.count}</h3>
                          <p>{stat.status.replace("_", " ")}</p>
                        </div>
                      ))}
                  </div>
                )}
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