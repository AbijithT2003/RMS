import React, { useState } from "react";
import CreateJobForm from "./CreateJobForm";

export default {
  title: "Components/Form/CreateJobForm",
  component: CreateJobForm,
  parameters: {
    layout: "centered",
  },
};

const CreateJobFormWrapper = (args) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    requirements: "",
    jobType: "FULL_TIME",
    location: "",
    salary: "",
    ...args.formData,
  });

  return (
    <CreateJobForm
      {...args}
      formData={formData}
      onChange={(field, value) => {
        setFormData({ ...formData, [field]: value });
      }}
    />
  );
};

export const Default = {
  render: (args) => <CreateJobFormWrapper {...args} />,
  args: {
    formData: {},
    onSubmit: (data) => {
      console.log("Job created:", data);
      alert("Job created successfully!");
    },
    loading: false,
  },
};

export const WithValidation = {
  render: (args) => <CreateJobFormWrapper {...args} />,
  args: {
    formData: {},
    onSubmit: (data) => {
      if (!data.jobTitle) {
        alert("Job title is required");
        return;
      }
      console.log("Job created:", data);
      alert("Job created successfully!");
    },
    loading: false,
  },
};

export const Processing = {
  render: (args) => <CreateJobFormWrapper {...args} />,
  args: {
    formData: {
      jobTitle: "Full Stack Developer",
      description: "Join our engineering team",
      requirements: "5+ years experience",
      jobType: "FULL_TIME",
      location: "San Francisco",
      salary: "$150,000+",
    },
    onSubmit: (data) => console.log("Job created:", data),
    loading: true,
  },
};

export const SuccessState = {
  render: (args) => <CreateJobFormWrapper {...args} />,
  args: {
    formData: {
      jobTitle: "Data Scientist",
      description: "We need a skilled data scientist",
      requirements: "ML experience, Python, SQL",
      jobType: "FULL_TIME",
      location: "Remote",
      salary: "$140,000 - $180,000",
    },
    onSubmit: (data) => {
      console.log("Job created:", data);
      alert("Job posting created successfully!");
    },
    loading: false,
    successMessage: "Job posted successfully!",
  },
};

export const WithError = {
  render: (args) => <CreateJobFormWrapper {...args} />,
  args: {
    formData: {},
    onSubmit: () => {
      alert("Error creating job. Please try again.");
    },
    loading: false,
    error:
      "Failed to create job posting. Please check your information and try again.",
  },
};

export const InitialRecommendedFields = {
  render: (args) => <CreateJobFormWrapper {...args} />,
  args: {
    formData: {
      jobType: "FULL_TIME",
    },
    onSubmit: (data) => console.log("Job created:", data),
    loading: false,
    helperText: "All fields are required. Fill in all details before posting.",
  },
};
