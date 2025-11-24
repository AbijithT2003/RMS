import React from "react";
import DashboardView from "./DashboardView";
import Breadcrumb from "./Breadcrumb";

export default {
  title: "Components/Common/DashboardView",
  component: DashboardView,
  parameters: {
    layout: "fullscreen",
  },
};

export const WithBreadcrumb = {
  args: {
    title: "Applications",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/applications" },
    ],
    children: (
      <div
        style={{ padding: "20px", background: "#f5f5f5", minHeight: "400px" }}
      >
        Application content here
      </div>
    ),
  },
};

export const WithoutBreadcrumb = {
  args: {
    title: "Job Listings",
    breadcrumbs: [],
    children: (
      <div
        style={{ padding: "20px", background: "#f5f5f5", minHeight: "400px" }}
      >
        Job listing content here
      </div>
    ),
  },
};

export const SingleLevelBreadcrumb = {
  args: {
    title: "Settings",
    breadcrumbs: [{ label: "Dashboard", href: "/" }],
    children: (
      <div
        style={{ padding: "20px", background: "#f5f5f5", minHeight: "400px" }}
      >
        Settings content here
      </div>
    ),
  },
};

export const DeepBreadcrumb = {
  args: {
    title: "Edit Application",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/applications" },
      { label: "Details", href: "/applications/123" },
      { label: "Edit", href: "/applications/123/edit" },
    ],
    children: (
      <div
        style={{ padding: "20px", background: "#f5f5f5", minHeight: "400px" }}
      >
        Edit form here
      </div>
    ),
  },
};

export const WithLongContent = {
  args: {
    title: "Dashboard Analytics",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Analytics", href: "/analytics" },
    ],
    children: (
      <div
        style={{ padding: "20px", background: "#f5f5f5", minHeight: "800px" }}
      >
        <h2>Analytics Report</h2>
        <p>Detailed analytics content with charts and metrics...</p>
      </div>
    ),
  },
};

export const RecruiterDashboardView = {
  args: {
    title: "Recruiter Dashboard",
    breadcrumbs: [{ label: "Dashboard", href: "/recruiter" }],
    children: (
      <div
        style={{ padding: "20px", background: "#f5f5f5", minHeight: "500px" }}
      >
        Recruiter dashboard widgets
      </div>
    ),
  },
};
