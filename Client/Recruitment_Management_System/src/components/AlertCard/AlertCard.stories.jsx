import React from "react";
import AlertCard from "./AlertCard";

export default {
  title: "Components/AlertCard",
  component: AlertCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      control: { type: "text" },
      description: "FontAwesome icon class",
    },
    title: {
      control: { type: "text" },
    },
    subtitle: {
      control: { type: "text" },
    },
    severity: {
      control: { type: "select" },
      options: ["info", "warning", "success", "danger"],
    },
    details: {
      control: { type: "object" },
    },
    actionButton: {
      control: { type: "object" },
    },
  },
};

export const InfoAlert = {
  args: {
    icon: "fas fa-info-circle",
    title: "New Opportunity",
    subtitle: "A job posting matching your profile is now available",
    severity: "info",
    actionButton: {
      label: "View Job",
      onClick: () => alert("Viewing job details"),
    },
  },
};

export const SuccessAlert = {
  args: {
    icon: "fas fa-check-circle",
    title: "Shortlisted!",
    subtitle: "Congratulations! You have been shortlisted",
    severity: "success",
    details: [
      { label: "Position", value: "Senior Developer" },
      { label: "Company", value: "Tech Corp" },
    ],
    actionButton: {
      label: "View Application",
      onClick: () => alert("Viewing application"),
    },
  },
};

export const WarningAlert = {
  args: {
    icon: "fas fa-exclamation-triangle",
    title: "Keep Trying!",
    subtitle: "Your rejection rate is above 50%",
    severity: "warning",
    details: [
      { label: "Total Applications", value: "20" },
      { label: "Success Rate", value: "30%" },
    ],
    actionButton: {
      label: "Browse More Jobs",
      onClick: () => alert("Browsing jobs"),
    },
  },
};

export const DangerAlert = {
  args: {
    icon: "fas fa-times-circle",
    title: "Action Required",
    subtitle: "Your account needs verification",
    severity: "danger",
    actionButton: {
      label: "Verify Now",
      onClick: () => alert("Starting verification"),
    },
  },
};

export const UpcomingInterviews = {
  args: {
    icon: "fas fa-calendar-alt",
    title: "Upcoming Interviews",
    subtitle: "You have 2 interviews scheduled this week",
    severity: "info",
    details: [
      { label: "Tomorrow", value: "2:00 PM - Tech Interview" },
      { label: "Friday", value: "11:00 AM - HR Discussion" },
    ],
    actionButton: {
      label: "View Schedule",
      onClick: () => alert("Viewing interview schedule"),
    },
  },
};

export const ProfileOptimization = {
  args: {
    icon: "fas fa-user-edit",
    title: "Enhance Your Profile",
    subtitle: "Complete your profile to increase match rate",
    severity: "info",
    details: [
      { label: "Missing", value: "Portfolio Link" },
      { label: "Missing", value: "Cover Letter" },
    ],
    actionButton: {
      label: "Update Profile",
      onClick: () => alert("Updating profile"),
    },
  },
};

export const GettingStarted = {
  args: {
    icon: "fas fa-rocket",
    title: "Start Your Journey",
    subtitle: "Browse and apply to exciting job opportunities",
    severity: "info",
    actionButton: {
      label: "Browse Jobs",
      onClick: () => alert("Browsing jobs"),
    },
  },
};

export const WithoutDetails = {
  args: {
    icon: "fas fa-lightbulb",
    title: "Pro Tip",
    subtitle: "Update your skills to match more job requirements",
    severity: "warning",
    actionButton: {
      label: "Add Skills",
      onClick: () => alert("Adding skills"),
    },
  },
};
