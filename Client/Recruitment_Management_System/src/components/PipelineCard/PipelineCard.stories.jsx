import React from "react";
import PipelineCard from "./PipelineCard";

export default {
  title: "Components/PipelineCard",
  component: PipelineCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: { type: "text" },
    },
    count: {
      control: { type: "number" },
    },
    percentage: {
      control: { type: "range", min: 0, max: 100 },
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "warning", "danger"],
    },
    icon: {
      control: { type: "text" },
      description: "FontAwesome icon class",
    },
  },
};

export const Applied = {
  args: {
    label: "Applied",
    count: 150,
    percentage: 100,
    color: "primary",
    icon: "fas fa-paper-plane",
  },
};

export const UnderReview = {
  args: {
    label: "Under Review",
    count: 89,
    percentage: 59,
    color: "secondary",
    icon: "fas fa-search",
  },
};

export const Shortlisted = {
  args: {
    label: "Shortlisted",
    count: 34,
    percentage: 23,
    color: "success",
    icon: "fas fa-star",
  },
};

export const Interview = {
  args: {
    label: "Interview Scheduled",
    count: 12,
    percentage: 8,
    color: "warning",
    icon: "fas fa-video",
  },
};

export const Selected = {
  args: {
    label: "Selected",
    count: 3,
    percentage: 2,
    color: "success",
    icon: "fas fa-check-circle",
  },
};

export const Rejected = {
  args: {
    label: "Rejected",
    count: 102,
    percentage: 68,
    color: "danger",
    icon: "fas fa-times-circle",
  },
};

export const WithoutIcon = {
  args: {
    label: "Stage",
    count: 45,
    percentage: 30,
    color: "primary",
  },
};

export const HighPercentage = {
  args: {
    label: "Completion Rate",
    count: 95,
    percentage: 95,
    color: "success",
    icon: "fas fa-chart-pie",
  },
};
