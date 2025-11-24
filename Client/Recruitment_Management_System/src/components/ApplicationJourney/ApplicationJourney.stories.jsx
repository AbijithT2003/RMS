import React from "react";
import ApplicationJourney from "./ApplicationJourney";

export default {
  title: "Components/ApplicationJourney",
  component: ApplicationJourney,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        "SUBMITTED",
        "UNDER_REVIEW",
        "SHORTLISTED",
        "INTERVIEW_SCHEDULED",
        "INTERVIEWED",
        "SELECTED",
        "REJECTED",
      ],
    },
    jobTitle: {
      control: { type: "text" },
    },
    recruiterName: {
      control: { type: "text" },
    },
    appliedAt: {
      control: { type: "text" },
    },
  },
};

export const Applied = {
  args: {
    status: "SUBMITTED",
    jobTitle: "Senior Frontend Developer",
    recruiterName: "Tech Corp",
    appliedAt: new Date(Date.now() - 86400000).toISOString(),
  },
};

export const UnderReview = {
  args: {
    status: "UNDER_REVIEW",
    jobTitle: "Full Stack Engineer",
    recruiterName: "Innovation Labs",
    appliedAt: new Date(Date.now() - 172800000).toISOString(),
  },
};

export const Shortlisted = {
  args: {
    status: "SHORTLISTED",
    jobTitle: "Product Manager",
    recruiterName: "StartUp Inc",
    appliedAt: new Date(Date.now() - 259200000).toISOString(),
  },
};

export const InterviewScheduled = {
  args: {
    status: "INTERVIEW_SCHEDULED",
    jobTitle: "DevOps Engineer",
    recruiterName: "Cloud Systems",
    appliedAt: new Date(Date.now() - 432000000).toISOString(),
  },
};

export const Interviewed = {
  args: {
    status: "INTERVIEWED",
    jobTitle: "Data Scientist",
    recruiterName: "AI Solutions",
    appliedAt: new Date(Date.now() - 604800000).toISOString(),
  },
};

export const Selected = {
  args: {
    status: "SELECTED",
    jobTitle: "Backend Developer",
    recruiterName: "Enterprise Corp",
    appliedAt: new Date(Date.now() - 864000000).toISOString(),
  },
};

export const Rejected = {
  args: {
    status: "REJECTED",
    jobTitle: "Mobile App Developer",
    recruiterName: "Mobile First Inc",
    appliedAt: new Date(Date.now() - 432000000).toISOString(),
  },
};

export const RecentApplication = {
  args: {
    status: "SUBMITTED",
    jobTitle: "UX/UI Designer",
    recruiterName: "Design Studio",
    appliedAt: new Date(Date.now() - 3600000).toISOString(),
  },
};

export const LongPipeline = {
  args: {
    status: "INTERVIEW_SCHEDULED",
    jobTitle: "Chief Technology Officer",
    recruiterName: "Fortune 500 Company",
    appliedAt: new Date(Date.now() - 2592000000).toISOString(),
  },
};
