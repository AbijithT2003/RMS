import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";
import Header from "../../components/organisms/Header/Header";
import Sidebar from "../../components/organisms/Sidebar/Sidebar";
import DashboardGrid from "../../components/organisms/DashboardGrid/DashboardGrid";
import "./Dashboard.css";

const ApplicantDashboard = () => {
  const [user] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return <div>Loading...</div>;

  const dashboardCards = [
    {
      icon: "fas fa-search",
      title: "Job Search",
      description: "Browse and apply to available positions",
      onClick: () => navigate("/applicant/jobs"),
    },
    {
      icon: "fas fa-file-alt",
      title: "My Applications",
      description: "Track your job applications and status",
      onClick: () => navigate("/applicant/applications"),
    },
    {
      icon: "fas fa-calendar",
      title: "Interviews",
      description: "Manage your upcoming interviews",
      onClick: () => navigate("/applicant/interviews"),
    },
    {
      icon: "fas fa-user",
      title: "Profile",
      description: "Update your resume and personal information",
      onClick: () => navigate("/applicant/profile"),
    },
  ];

  const applicantNav = [
    {
      label: "Jobs",
      items: [
        {
          label: "Browse Jobs",
          href: "/applicant/jobs",
          icon: "fas fa-search",
        },
        {
          label: "saved Jobs",
          href: "/applicant/jobs/saved",
          icon: "fas fa-filter",
        },
        {
          label: "Applied Jobs",
          href: "/applicant/applications",
          icon: "fas fa-file-alt",
        },
      ],
    },
    {
      label: "Applications",
      items: [
        {
          label: "My Applications",
          href: "/applicant/applications",
          icon: "fas fa-list",
        },
        {
          label: "Interviews",
          href: "/applicant/interviews",
          icon: "fas fa-calendar",
        },
      ],
    },
    {
      label: "Profile",
      items: [
        {
          label: "My Profile",
          href: "/applicant/profile",
          icon: "fas fa-user",
        },
        { label: "Logout", href: "/", icon: "fas fa-sign-out-alt" },
      ],
    },
  ];

  const handleNavigation = (item) => {
    if (item.label === "Logout") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <div className="dashboard">
      <Header
        navigationItems={applicantNav}
        onNavigate={handleNavigation}
        showAuthButtons={false}
      />
      {/* <Sidebar navigationItems={applicantNav}   />  */}

      <main className="dashboard-main">
        <div className="dashboard-content">
          <DashboardGrid cards={dashboardCards} />

          <div className="dashboard-right">
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
        </div>
      </main>
    </div>
  );
};

export default ApplicantDashboard;
