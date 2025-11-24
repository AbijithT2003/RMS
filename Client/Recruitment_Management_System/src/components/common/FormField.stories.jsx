import React, { useState } from "react";
import FormField from "./FormField";

export default {
  title: "Components/Common/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "textarea", "select"],
    },
    required: {
      control: { type: "boolean" },
    },
  },
};

const FormFieldWrapper = (props) => {
  const [value, setValue] = useState("");
  return (
    <FormField
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const TextInput = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: "Full Name",
    type: "text",
    name: "fullName",
    placeholder: "Enter your full name",
    required: false,
  },
};

export const EmailInput = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: "Email Address",
    type: "email",
    name: "email",
    placeholder: "your.email@example.com",
    required: true,
  },
};

export const PasswordInput = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter password",
    required: true,
  },
};

export const NumberInput = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: "Experience Years",
    type: "number",
    name: "experience",
    placeholder: "Years of experience",
    required: false,
  },
};

export const TextArea = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: "About You",
    type: "textarea",
    name: "about",
    placeholder: "Tell us about yourself",
    required: false,
  },
};

export const SelectDropdown = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: "Job Type",
    type: "select",
    name: "jobType",
    required: true,
    options: [
      { value: "", label: "Select job type" },
      { value: "FULL_TIME", label: "Full Time" },
      { value: "PART_TIME", label: "Part Time" },
      { value: "CONTRACT", label: "Contract" },
      { value: "INTERNSHIP", label: "Internship" },
    ],
  },
};

export const RequiredField = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: "Company Name",
    type: "text",
    name: "companyName",
    placeholder: "Enter company name",
    required: true,
  },
};

export const LongTextArea = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: "Job Description",
    type: "textarea",
    name: "description",
    placeholder: "Describe the job position",
    required: true,
  },
};

export const SelectWithManyOptions = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: "Department",
    type: "select",
    name: "department",
    required: true,
    options: [
      { value: "", label: "Select department" },
      { value: "ENGINEERING", label: "Engineering" },
      { value: "SALES", label: "Sales" },
      { value: "MARKETING", label: "Marketing" },
      { value: "HR", label: "Human Resources" },
      { value: "FINANCE", label: "Finance" },
      { value: "OPERATIONS", label: "Operations" },
    ],
  },
};
