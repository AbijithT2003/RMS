import React from "react";
import DashboardGrid from "./DashboardGrid";

export default {
  title: "Components/DashboardGrid",
  component: DashboardGrid,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    cards: {
      control: { type: "object" },
    },
  },
};

const sampleCards = [
  {
    icon: "fas fa-briefcase",
    title: "Browse Jobs",
    description: "Explore job opportunities",
    onClick: () => alert("Navigate to jobs"),
  },
  {
    icon: "fas fa-bookmark",
    title: "Saved Jobs",
    description: "View your saved positions",
    onClick: () => alert("Navigate to saved jobs"),
  },
  {
    icon: "fas fa-file-alt",
    title: "Applications",
    description: "Track your applications",
    onClick: () => alert("Navigate to applications"),
  },
  {
    icon: "fas fa-video",
    title: "Interviews",
    description: "Schedule interviews",
    onClick: () => alert("Navigate to interviews"),
  },
];

const recruiterCards = [
  {
    icon: "fas fa-plus-circle",
    title: "Create Job",
    description: "Post a new job listing",
    onClick: () => alert("Create new job"),
  },
  {
    icon: "fas fa-tasks",
    title: "Manage Jobs",
    description: "Edit existing postings",
    onClick: () => alert("View all jobs"),
  },
  {
    icon: "fas fa-users",
    title: "Applications",
    description: "Review applicants",
    onClick: () => alert("View applications"),
  },
  {
    icon: "fas fa-chart-bar",
    title: "Analytics",
    description: "View hiring metrics",
    onClick: () => alert("View analytics"),
  },
];

export const ApplicantDashboard = {
  args: {
    cards: sampleCards,
  },
};

export const RecruiterDashboard = {
  args: {
    cards: recruiterCards,
  },
};

export const TwoColumns = {
  args: {
    cards: sampleCards.slice(0, 2),
  },
};

export const SingleColumn = {
  args: {
    cards: [sampleCards[0]],
  },
};

export const SixCards = {
  args: {
    cards: [
      ...sampleCards,
      {
        icon: "fas fa-user-circle",
        title: "Profile",
        description: "Manage your profile",
        onClick: () => alert("Navigate to profile"),
      },
      {
        icon: "fas fa-cog",
        title: "Settings",
        description: "Adjust preferences",
        onClick: () => alert("Navigate to settings"),
      },
    ],
  },
};

export const LargeSet = {
  args: {
    cards: [
      ...recruiterCards,
      {
        icon: "fas fa-envelope",
        title: "Messages",
        description: "Check communications",
        onClick: () => alert("Navigate to messages"),
      },
      {
        icon: "fas fa-star",
        title: "Favorites",
        description: "Your favorite candidates",
        onClick: () => alert("Navigate to favorites"),
      },
      {
        icon: "fas fa-history",
        title: "History",
        description: "Recent activities",
        onClick: () => alert("View history"),
      },
    ],
  },
};
