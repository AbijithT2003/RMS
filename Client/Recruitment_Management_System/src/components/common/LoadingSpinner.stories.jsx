import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export default {
  title: "Components/Common/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  args: {},
};

export const Small = {
  args: {
    size: "small",
  },
};

export const Medium = {
  args: {
    size: "medium",
  },
};

export const Large = {
  args: {
    size: "large",
  },
};

export const WithMessage = {
  args: {
    message: "Loading your applications...",
  },
};

export const WithLoadingJobs = {
  args: {
    message: "Fetching job listings...",
    size: "medium",
  },
};

export const OverlayMode = {
  args: {
    overlay: true,
    message: "Processing your request...",
  },
};

export const LargeWithMessage = {
  args: {
    size: "large",
    message: "Analyzing your profile...",
  },
};
