import React from "react";
import Breadcrumb from "./Breadcrumb";

export default {
  title: "Components/Common/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    items: {
      control: { type: "object" },
    },
    onNavigate: { action: "navigated" },
  },
};

export const SingleItem = {
  args: {
    items: [{ label: "Home", href: "/" }],
    onNavigate: (href) => console.log("Navigate to:", href),
  },
};

export const TwoItems = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Jobs", href: "/jobs" },
    ],
    onNavigate: (href) => console.log("Navigate to:", href),
  },
};

export const ThreeItems = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/applications" },
      { label: "Details", href: "/applications/123" },
    ],
    onNavigate: (href) => console.log("Navigate to:", href),
  },
};

export const FourItems = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Recruiter", href: "/recruiter" },
      { label: "Jobs", href: "/recruiter/jobs" },
      { label: "Edit", href: "/recruiter/jobs/123/edit" },
    ],
    onNavigate: (href) => console.log("Navigate to:", href),
  },
};

export const WithCurrentPage = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Profile", href: "/profile", current: true },
    ],
    onNavigate: (href) => console.log("Navigate to:", href),
  },
};

export const DashboardPath = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Analytics", href: "/dashboard/analytics", current: true },
    ],
    onNavigate: (href) => console.log("Navigate to:", href),
  },
};

export const LongPath = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Management", href: "/management" },
      { label: "Candidates", href: "/management/candidates" },
      { label: "Applications", href: "/management/candidates/applications" },
      {
        label: "Review",
        href: "/management/candidates/applications/review",
        current: true,
      },
    ],
    onNavigate: (href) => console.log("Navigate to:", href),
  },
};
