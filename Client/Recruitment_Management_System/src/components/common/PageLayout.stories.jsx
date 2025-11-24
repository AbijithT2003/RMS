import React from "react";
import PageLayout from "./PageLayout";

export default {
  title: "Components/Common/PageLayout",
  component: PageLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  args: {
    title: "Applications",
    children: (
      <div style={{ padding: "20px" }}>Your applications page content here</div>
    ),
    loading: false,
    error: null,
  },
};

export const WithLoading = {
  args: {
    title: "Loading Dashboard",
    children: (
      <div style={{ padding: "20px" }}>
        This content will be hidden while loading
      </div>
    ),
    loading: true,
    error: null,
  },
};

export const WithError = {
  args: {
    title: "Jobs",
    children: <div style={{ padding: "20px" }}>Page content</div>,
    loading: false,
    error: "Failed to load jobs. Please try again.",
  },
};

export const LongContent = {
  args: {
    title: "Dashboard",
    children: (
      <div style={{ padding: "20px" }}>
        <h2>Welcome to your dashboard</h2>
        <p>This is a long page with lots of content...</p>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
      </div>
    ),
    loading: false,
    error: null,
  },
};

export const LoadingWithTitle = {
  args: {
    title: "Processing Your Request",
    children: <div style={{ padding: "20px" }}>Analyzing your data...</div>,
    loading: true,
    error: null,
  },
};

export const ErrorWithDetails = {
  args: {
    title: "Error Page",
    children: (
      <div style={{ padding: "20px" }}>
        Page content that won't display due to error
      </div>
    ),
    loading: false,
    error:
      "Unable to connect to the server. Status code: 500. Please contact support if the problem persists.",
  },
};

export const EmptyState = {
  args: {
    title: "Saved Items",
    children: (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3>No saved items yet</h3>
        <p>Start by bookmarking your favorite jobs</p>
      </div>
    ),
    loading: false,
    error: null,
  },
};
