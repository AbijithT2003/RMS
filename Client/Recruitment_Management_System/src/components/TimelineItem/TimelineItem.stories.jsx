import React from "react";
import TimelineItem from "./TimelineItem";

export default {
  title: "Components/TimelineItem",
  component: TimelineItem,
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
    description: {
      control: { type: "text" },
    },
    timestamp: {
      control: { type: "text" },
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "warning", "danger"],
    },
    status: {
      control: { type: "select" },
      options: [undefined, "pending", "completed", "in-progress", "rejected"],
    },
  },
};

export const ApplicationReceived = {
  args: {
    icon: "fas fa-file-alt",
    title: "Application Received",
    description: "John Doe applied for Senior Developer position",
    timestamp: new Date(Date.now() - 3600000),
    color: "primary",
  },
};

export const UnderReview = {
  args: {
    icon: "fas fa-search",
    title: "Application Under Review",
    description: "HR team is reviewing your application",
    timestamp: new Date(Date.now() - 7200000),
    color: "secondary",
    status: "in-progress",
  },
};

export const Shortlisted = {
  args: {
    icon: "fas fa-star",
    title: "Shortlisted",
    description: "Congratulations! You have been shortlisted",
    timestamp: new Date(Date.now() - 86400000),
    color: "success",
    status: "completed",
  },
};

export const InterviewScheduled = {
  args: {
    icon: "fas fa-video",
    title: "Interview Scheduled",
    description: "Your interview is scheduled for tomorrow at 2 PM",
    timestamp: new Date(Date.now() - 172800000),
    color: "warning",
    status: "in-progress",
  },
};

export const Rejected = {
  args: {
    icon: "fas fa-times-circle",
    title: "Application Rejected",
    description: "Thank you for applying, but we cannot proceed at this time",
    timestamp: new Date(Date.now() - 259200000),
    color: "danger",
    status: "rejected",
  },
};

export const Selected = {
  args: {
    icon: "fas fa-check-circle",
    title: "Offer Extended",
    description: "We are pleased to extend an offer for the position",
    timestamp: new Date(Date.now() - 432000000),
    color: "success",
    status: "completed",
  },
};

export const WithoutStatus = {
  args: {
    icon: "fas fa-bell",
    title: "Notification",
    description: "You have a new message from the recruiter",
    timestamp: new Date(Date.now() - 1800000),
    color: "primary",
  },
};

export const RecentActivity = {
  args: {
    icon: "fas fa-user-check",
    title: "Profile Updated",
    description: "Your profile information has been updated successfully",
    timestamp: new Date(Date.now() - 600000),
    color: "secondary",
  },
};
