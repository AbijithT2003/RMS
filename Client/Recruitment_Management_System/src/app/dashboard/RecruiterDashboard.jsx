import React from "react";
import DashboardContainer from "../../components/DashboardContainer";
import DashboardGrid from "../../components/organisms/DashboardGrid/DashboardGrid";
import DashboardView from "../../components/common/DashboardView";
import StatsCard from "../../components/ui/StatsCard/StatsCard";
import PipelineCard from "../../components/ui/PipelineCard/PipelineCard";
import TimelineItem from "../../components/ui/TimelineItem/TimelineItem";
import {
  ManageJobsPage,
  CreateJobPage,
  ManageApplicationsPage,
  MyInterviewsPage,
  InterviewSchedulePage,
} from "../../pages";
import { useApi } from "../../hooks/useApi";
import { jobsApi } from "../../api/endpoints/jobs.api";
import { applicationsApi } from "../../api/endpoints/applications.api";
import { interviewsApi } from "../../api/endpoints/interviews.api";
import "./Dashboard.css";

const RecruiterDashboard = () => {
  // Fetch API data
  const { data: jobsData } = useApi(() => jobsApi.getJobsByRecruiter());
  const { data: applicationsData } = useApi(() =>
    applicationsApi.getApplications(0, 1000)
  );
  const { data: interviewsData } = useApi(() =>
    interviewsApi.getMyInterviews()
  );

  // Process data
  const myJobs = jobsData || [];
  const allApplications = applicationsData?.content || applicationsData || [];
  const myInterviews = interviewsData || [];

  // Calculate stats
  const totalJobs = myJobs.length;
  const totalApplications = allApplications.length;
  const totalInterviews = myInterviews.length;
  const activeJobs = myJobs.filter(
    (j) => j.status === "ACTIVE" || j.status === "OPEN"
  ).length;

  // Calculate application pipeline
  const applicationsByStatus = {
    pending: allApplications.filter(
      (app) => app.status === "SUBMITTED" || app.status === "APPLIED"
    ).length,
    reviewed: allApplications.filter(
      (app) => app.status === "REVIEWED" || app.status === "SHORTLISTED"
    ).length,
    interviewed: allApplications.filter((app) => app.status === "INTERVIEWED")
      .length,
    selected: allApplications.filter(
      (app) => app.status === "SELECTED" || app.status === "APPROVED"
    ).length,
    rejected: allApplications.filter((app) => app.status === "REJECTED").length,
  };

  // Get recent activities (applications and interviews combined)
  const recentActivities = [
    ...allApplications.slice(0, 3).map((app) => ({
      type: "application",
      icon: "fas fa-file-alt",
      title: `New Application for ${app.jobTitle || "Position"}`,
      description: `${app.applicantName || "Applicant"} applied for this role`,
      timestamp: app.appliedAt,
      color: "secondary",
      status: app.status,
    })),
    ...myInterviews.slice(0, 2).map((interview) => ({
      type: "interview",
      icon: "fas fa-video",
      title: `Interview Scheduled`,
      description: `Interview with candidate scheduled`,
      timestamp: interview.scheduledAt,
      color: "warning",
      status: interview.status,
    })),
  ]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

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
        {
          label: "All Applications",
          view: "applications",
          icon: "fas fa-file-alt",
        },
        { label: "My Interviews", view: "interviews", icon: "fas fa-calendar" },
        // { label: "Schedule Interview", view: "schedule", icon: "fas fa-calendar-plus" },
      ],
    },
    {
      label: "Profile",
      items: [{ label: "Logout", icon: "fas fa-sign-out-alt" }],
    },
  ];

  const renderView = (activeView, setActiveView) => {
    const dashboardCards = [
      {
        icon: "fas fa-plus",
        title: "Post Job",
        description: "Create new job postings to attract candidates",
        onClick: () => setActiveView("create-job"),
      },
      {
        icon: "fas fa-briefcase",
        title: "Manage Jobs",
        description: "View and edit your active job postings",
        onClick: () => setActiveView("jobs"),
      },
      {
        icon: "fas fa-users",
        title: "Candidates",
        description: "Review applications and candidate profiles",
        onClick: () => setActiveView("applications"),
      },
      {
        icon: "fas fa-calendar-alt",
        title: "Interviews",
        description: "Schedule and manage candidate interviews",
        onClick: () => setActiveView("interviews"),
      },
    ];

    const getBreadcrumbs = (view) => [
      { label: "Dashboard", onClick: () => setActiveView("dashboard") },
      { label: getViewTitle(view) },
    ];

    const getViewTitle = (view) => {
      switch (view) {
        case "jobs":
          return "Manage Jobs";
        case "create-job":
          return "Create Job";
        case "applications":
          return "Applications";
        case "interviews":
          return "Interviews";
        case "schedule":
          return "Schedule Interview";
        default:
          return "Dashboard";
      }
    };

    switch (activeView) {
      case "jobs":
        return (
          <DashboardView
            title="Manage Jobs"
            breadcrumbs={getBreadcrumbs("jobs")}
          >
            <ManageJobsPage onNavigate={setActiveView} />
          </DashboardView>
        );
      case "create-job":
        return (
          <DashboardView
            title="Create New Job"
            breadcrumbs={getBreadcrumbs("create-job")}
          >
            <CreateJobPage onNavigate={setActiveView} />
          </DashboardView>
        );
      case "applications":
        return (
          <DashboardView
            title="Manage Applications"
            breadcrumbs={getBreadcrumbs("applications")}
          >
            <ManageApplicationsPage />
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
      case "schedule":
        return (
          <DashboardView
            title="Schedule Interview"
            breadcrumbs={getBreadcrumbs("schedule")}
          >
            <InterviewSchedulePage />
          </DashboardView>
        );
      default:
        return (
          <div className="dashboard-content">
            {/* Stats Row */}
            <div className="dashboard-stats-grid">
              <StatsCard
                icon="fas fa-briefcase"
                label="Total Jobs"
                value={totalJobs}
                trend={activeJobs}
                trendDirection={activeJobs > 0 ? "up" : "down"}
                color="primary"
                onClick={() => setActiveView("jobs")}
              />
              <StatsCard
                icon="fas fa-file-alt"
                label="Total Applications"
                value={totalApplications}
                trend={applicationsByStatus.pending}
                trendDirection="up"
                color="secondary"
                onClick={() => setActiveView("applications")}
              />
              <StatsCard
                icon="fas fa-video"
                label="Scheduled Interviews"
                value={totalInterviews}
                trend={
                  myInterviews.filter((i) => i.status === "SCHEDULED").length
                }
                trendDirection="up"
                color="warning"
                onClick={() => setActiveView("interviews")}
              />
              <StatsCard
                icon="fas fa-check-circle"
                label="Active Jobs"
                value={activeJobs}
                color="success"
                onClick={() => setActiveView("jobs")}
              />
            </div>

            {/* Quick Actions Grid */}
            <div className="dashboard-top">
              <DashboardGrid cards={dashboardCards} />
            </div>

            {/* Pipeline & Timeline Section */}
            <div className="dashboard-bottom">
              <div className="dashboard-pipeline">
                <h2 className="section-title">Application Pipeline</h2>
                <div className="pipeline-grid">
                  <PipelineCard
                    label="Applied"
                    icon="fas fa-inbox"
                    count={applicationsByStatus.pending}
                    percentage={
                      totalApplications > 0
                        ? Math.round(
                            (applicationsByStatus.pending / totalApplications) *
                              100
                          )
                        : 0
                    }
                    color="secondary"
                  />
                  <PipelineCard
                    label="Reviewed"
                    icon="fas fa-star"
                    count={applicationsByStatus.reviewed}
                    percentage={
                      totalApplications > 0
                        ? Math.round(
                            (applicationsByStatus.reviewed /
                              totalApplications) *
                              100
                          )
                        : 0
                    }
                    color="primary"
                  />
                  <PipelineCard
                    label="Interviewed"
                    icon="fas fa-video"
                    count={applicationsByStatus.interviewed}
                    percentage={
                      totalApplications > 0
                        ? Math.round(
                            (applicationsByStatus.interviewed /
                              totalApplications) *
                              100
                          )
                        : 0
                    }
                    color="warning"
                  />
                  <PipelineCard
                    label="Selected"
                    icon="fas fa-check"
                    count={applicationsByStatus.selected}
                    percentage={
                      totalApplications > 0
                        ? Math.round(
                            (applicationsByStatus.selected /
                              totalApplications) *
                              100
                          )
                        : 0
                    }
                    color="success"
                  />
                  <PipelineCard
                    label="Rejected"
                    icon="fas fa-times"
                    count={applicationsByStatus.rejected}
                    percentage={
                      totalApplications > 0
                        ? Math.round(
                            (applicationsByStatus.rejected /
                              totalApplications) *
                              100
                          )
                        : 0
                    }
                    color="danger"
                  />
                </div>
              </div>

              <div className="recent-activity">
                <h2 className="section-title">Recent Activity</h2>
                <div className="timeline-list">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity, index) => (
                      <TimelineItem
                        key={index}
                        icon={activity.icon}
                        title={activity.title}
                        description={activity.description}
                        timestamp={activity.timestamp}
                        color={activity.color}
                        status={activity.status}
                      />
                    ))
                  ) : (
                    <div className="empty-state">
                      <i className="fas fa-inbox"></i>
                      <p>No recent activity</p>
                    </div>
                  )}
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
