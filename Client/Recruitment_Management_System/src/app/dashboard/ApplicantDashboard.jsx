import DashboardContainer from "./DashboardContainer";
import DashboardGrid from "../../components/DashboardGrid/DashboardGrid";
import DashboardView from "../../components/common/DashboardView";
import StatsCard from "../../components/StatsCard/StatsCard";
import AlertCard from "../../components/AlertCard/AlertCard";
import ApplicationJourney from "../../components/ApplicationJourney/ApplicationJourney";
import {
  JobListPage,
  MyApplicationsPage,
  MyInterviewsPage,
  ApplicantProfilePage,
  SavedJobsPage,
} from "../../pages";
import "./Dashboard.css";
import { useApi } from "../../hooks/useApi";
import { applicationsApi } from "../../api/endpoints/applications.api";

const ApplicantDashboard = () => {
  const { data: applicationsData } = useApi(() =>
    applicationsApi.getMyApplications()
  );

  const applications = applicationsData?.content || [];

  // Calculate stats
  const totalApplications = applications.length;
  const scheduledInterviews = applications.filter(
    (app) =>
      app.status === "INTERVIEW_SCHEDULED" || app.status === "INTERVIEWED"
  ).length;
  const shortlistedJobs = applications.filter((app) =>
    ["SHORTLISTED", "INTERVIEW_SCHEDULED", "INTERVIEWED", "SELECTED"].includes(
      app.status
    )
  ).length;
  const rejections = applications.filter(
    (app) => app.status === "REJECTED"
  ).length;
  const rejectionRate =
    totalApplications > 0
      ? Math.round((rejections / totalApplications) * 100)
      : 0;

  // Get recent applications for timeline
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
    .slice(0, 3);

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
            {/* Stats Cards Grid */}
            <div className="dashboard-stats-grid">
              <StatsCard
                icon="fas fa-file-alt"
                label="Total Applications"
                value={totalApplications}
                color="primary"
                onClick={() => setActiveView("applications")}
              />
              <StatsCard
                icon="fas fa-video"
                label="Scheduled Interviews"
                value={scheduledInterviews}
                color="warning"
                onClick={() => setActiveView("interviews")}
              />
              <StatsCard
                icon="fas fa-star"
                label="Shortlisted Jobs"
                value={shortlistedJobs}
                color="secondary"
              />
              <StatsCard
                icon="fas fa-times-circle"
                label="Rejection Rate"
                value={`${rejectionRate}%`}
                color="danger"
              />
            </div>

            {/* Quick Actions Grid */}
            <div className="dashboard-top">
              <DashboardGrid cards={dashboardCards} />
            </div>

            {/* Timeline & Alert Section */}
            <div className="dashboard-bottom applicant-layout">
              <div className="timeline-column">
                <h2 className="section-title">Recent Applications</h2>
                <div className="applications-timeline">
                  {recentApplications.length > 0 ? (
                    recentApplications.map((app) => (
                      <ApplicationJourney
                        key={app.id}
                        status={app.status}
                        appliedAt={app.appliedAt}
                        jobTitle={app.jobTitle || "Position"}
                        recruiterName={app.recruiterName || "Company"}
                      />
                    ))
                  ) : (
                    <div className="empty-state">
                      <i className="fas fa-inbox"></i>
                      <p>No recent applications</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="alert-column">
                <h2 className="section-title">Alerts & Updates</h2>
                <div className="alerts-container">
                  {shortlistedJobs > 0 && (
                    <AlertCard
                      icon="fas fa-star"
                      title="Shortlisted!"
                      subtitle={`You have ${shortlistedJobs} shortlisted position(s)`}
                      severity="success"
                      actionButton={{
                        label: "View Applications",
                        onClick: () => setActiveView("applications"),
                      }}
                    />
                  )}

                  {scheduledInterviews > 0 && (
                    <AlertCard
                      icon="fas fa-video"
                      title="Upcoming Interviews"
                      subtitle={`You have ${scheduledInterviews} interview(s) scheduled`}
                      severity="info"
                      actionButton={{
                        label: "View Schedule",
                        onClick: () => setActiveView("interviews"),
                      }}
                    />
                  )}

                  {rejections > 0 && rejectionRate > 50 && (
                    <AlertCard
                      icon="fas fa-chart-line"
                      title="Keep Trying!"
                      subtitle="Optimize your applications to increase success rate"
                      details={[
                        { label: "Applied", value: totalApplications },
                        {
                          label: "Success Rate",
                          value: `${100 - rejectionRate}%`,
                        },
                      ]}
                      severity="warning"
                      actionButton={{
                        label: "Browse More Jobs",
                        onClick: () => setActiveView("jobs"),
                      }}
                    />
                  )}

                  {shortlistedJobs === 0 && totalApplications > 0 && (
                    <AlertCard
                      icon="fas fa-lightbulb"
                      title="Tip: Enhance Your Profile"
                      subtitle="A complete profile increases your chances of being shortlisted"
                      severity="info"
                      actionButton={{
                        label: "Update Profile",
                        onClick: () => setActiveView("profile"),
                      }}
                    />
                  )}

                  {totalApplications === 0 && (
                    <AlertCard
                      icon="fas fa-search"
                      title="Start Your Journey"
                      subtitle="Apply to jobs that match your skills and experience"
                      severity="info"
                      actionButton={{
                        label: "Browse Jobs",
                        onClick: () => setActiveView("jobs"),
                      }}
                    />
                  )}
                </div>
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
