import React, { useState } from "react";
import EditJobForm from "./EditJobForm";

export default {
  title: "Components/Form/EditJobForm",
  component: EditJobForm,
  parameters: {
    layout: "centered",
  },
};

const EditJobFormWrapper = (args) => {
  const [formData, setFormData] = useState({
    jobTitle: "Senior Developer",
    description: "Looking for an experienced developer",
    requirements: "5+ years experience",
    jobType: "FULL_TIME",
    location: "San Francisco, CA",
    salary: "$150,000 - $200,000",
    ...args.formData,
  });

  return (
    <EditJobForm
      {...args}
      formData={formData}
      onChange={(field, value) => {
        setFormData({ ...formData, [field]: value });
      }}
    />
  );
};

export const Default = {
  render: (args) => <EditJobFormWrapper {...args} />,
  args: {
    formData: {
      jobTitle: "Senior React Developer",
      description: "Join our frontend team and build amazing applications",
      requirements: "5+ years React experience, TypeScript, CSS",
      jobType: "FULL_TIME",
      location: "San Francisco, CA",
      salary: "$150,000 - $200,000",
    },
    onSubmit: (data) => {
      console.log("Job updated:", data);
      alert("Job updated successfully!");
    },
    loading: false,
  },
};

export const Updating = {
  render: (args) => <EditJobFormWrapper {...args} />,
  args: {
    formData: {
      jobTitle: "Backend Engineer",
      description: "Updating the backend team requirements",
      requirements: "Node.js, Databases, System Design",
      jobType: "FULL_TIME",
      location: "Remote",
      salary: "$130,000 - $180,000",
    },
    onSubmit: (data) => console.log("Job updated:", data),
    loading: true,
  },
};

export const MinorChanges = {
  render: (args) => <EditJobFormWrapper {...args} />,
  args: {
    formData: {
      jobTitle: "Senior Developer",
      description: "Looking for an experienced developer to join our team",
      requirements:
        "5+ years experience, team player, willing to mentor juniors",
      jobType: "FULL_TIME",
      location: "San Francisco, CA",
      salary: "$150,000 - $210,000",
    },
    onSubmit: (data) => console.log("Job updated:", data),
    loading: false,
    unsavedChanges: true,
  },
};

export const ChangeJobType = {
  render: (args) => <EditJobFormWrapper {...args} />,
  args: {
    formData: {
      jobTitle: "Part-time Designer",
      description: "We are looking for a flexible part-time designer",
      requirements: "Figma, UI/UX design experience",
      jobType: "PART_TIME",
      location: "Remote",
      salary: "$50 - $75 per hour",
    },
    onSubmit: (data) => console.log("Job updated:", data),
    loading: false,
  },
};

export const SuccessfulUpdate = {
  render: (args) => <EditJobFormWrapper {...args} />,
  args: {
    formData: {
      jobTitle: "Marketing Manager",
      description: "Updated requirements for marketing role",
      requirements: "Digital marketing, team management, analytics",
      jobType: "FULL_TIME",
      location: "New York, NY",
      salary: "$100,000 - $140,000",
    },
    onSubmit: (data) => {
      console.log("Job updated:", data);
      alert("Job updated successfully!");
    },
    loading: false,
    successMessage: "Job posting updated!",
  },
};

export const ErrorInUpdate = {
  render: (args) => <EditJobFormWrapper {...args} />,
  args: {
    formData: {
      jobTitle: "QA Engineer",
      description: "Quality Assurance Engineer needed",
      requirements: "Testing frameworks, automation",
      jobType: "FULL_TIME",
      location: "Chicago, IL",
      salary: "$90,000 - $130,000",
    },
    onSubmit: (data) => console.log("Job updated:", data),
    loading: false,
    error: "Failed to update job. Please try again.",
  },
};

export const WarningUnsavedChanges = {
  render: (args) => <EditJobFormWrapper {...args} />,
  args: {
    formData: {
      jobTitle: "DevOps Engineer",
      description: "Looking for DevOps expertise",
      requirements: "Kubernetes, Docker, CI/CD pipelines",
      jobType: "FULL_TIME",
      location: "Remote",
      salary: "$140,000 - $180,000",
    },
    onSubmit: (data) => console.log("Job updated:", data),
    loading: false,
    unsavedChanges: true,
    warningMessage: "You have unsaved changes. Please save before leaving.",
  },
};
