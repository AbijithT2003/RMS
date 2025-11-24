import React from "react";
import StatsCard from "./StatsCard";

export default {
  title: "Components/StatsCard",
  component: StatsCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      control: { type: "text" },
      description: "FontAwesome icon class",
    },
    label: {
      control: { type: "text" },
    },
    value: {
      control: { type: "text" },
    },
    trend: {
      control: { type: "text" },
    },
    trendDirection: {
      control: { type: "select" },
      options: ["up", "down"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "warning", "danger"],
    },
    onClick: { action: "clicked" },
  },
};

export const Primary = {
  args: {
    icon: "fas fa-briefcase",
    label: "Total Jobs",
    value: "24",
    trend: "+5",
    trendDirection: "up",
    color: "primary",
  },
};

export const Secondary = {
  args: {
    icon: "fas fa-file-alt",
    label: "Applications",
    value: "148",
    trend: "+12",
    trendDirection: "up",
    color: "secondary",
  },
};

export const Success = {
  args: {
    icon: "fas fa-check-circle",
    label: "Hired",
    value: "8",
    trend: "+2",
    trendDirection: "up",
    color: "success",
  },
};

export const Warning = {
  args: {
    icon: "fas fa-exclamation-triangle",
    label: "Pending Review",
    value: "35",
    trend: "-3",
    trendDirection: "down",
    color: "warning",
  },
};

export const Danger = {
  args: {
    icon: "fas fa-times-circle",
    label: "Rejected",
    value: "18",
    trend: "+4",
    trendDirection: "down",
    color: "danger",
  },
};

export const WithoutTrend = {
  args: {
    icon: "fas fa-users",
    label: "Team Members",
    value: "12",
    color: "primary",
  },
};

export const Clickable = {
  args: {
    icon: "fas fa-calendar",
    label: "Interviews Scheduled",
    value: "5",
    trend: "+1",
    trendDirection: "up",
    color: "secondary",
    onClick: () => alert("Stats card clicked!"),
  },
};
