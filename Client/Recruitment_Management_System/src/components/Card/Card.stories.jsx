import React from "react";
import Card from "./Card";

export default {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    image: {
      control: { type: "text" },
    },
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    actionText: {
      control: { type: "text" },
    },
    actionHref: {
      control: { type: "text" },
    },
  },
};

export const Default = {
  args: {
    title: "Recruitment Dashboard",
    description:
      "Manage job postings, applications, and interviews all in one place",
    actionText: "Explore Dashboard",
    actionHref: "/dashboard",
  },
};

export const WithImage = {
  args: {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    title: "Find Your Dream Job",
    description:
      "Browse thousands of job opportunities from top companies around the world",
    actionText: "Browse Jobs",
    actionHref: "/jobs",
  },
};

export const JobPosting = {
  args: {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    title: "Senior Developer",
    description:
      "Join our growing team as a Senior Developer and help build the future of recruitment technology",
    actionText: "Apply Now",
    actionHref: "/jobs/1",
  },
};

export const Feature = {
  args: {
    title: "Advanced Analytics",
    description:
      "Get deep insights into your recruitment pipeline with real-time analytics and reporting",
    actionText: "Learn More",
    actionHref: "#analytics",
  },
};

export const Testimonial = {
  args: {
    title: "Industry Leader",
    description:
      "Trusted by over 500 companies worldwide to streamline their recruitment process",
    actionText: "View Case Study",
    actionHref: "/case-studies",
  },
};

export const Opportunity = {
  args: {
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop",
    title: "Internship Program",
    description:
      "Start your career with an internship at our innovative tech company",
    actionText: "Apply for Internship",
    actionHref: "/internships",
  },
};
