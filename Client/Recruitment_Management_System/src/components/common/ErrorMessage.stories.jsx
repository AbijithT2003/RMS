import React from "react";
import ErrorMessage from "./ErrorMessage";

export default {
  title: "Components/Common/ErrorMessage",
  component: ErrorMessage,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    message: {
      control: { type: "text" },
    },
    onDismiss: { action: "dismissed" },
  },
};

export const ServerError = {
  args: {
    message: "Something went wrong. Please try again later.",
    onDismiss: () => console.log("Error dismissed"),
  },
};

export const ValidationError = {
  args: {
    message: "Please fill in all required fields.",
    onDismiss: () => console.log("Error dismissed"),
  },
};

export const NotFoundError = {
  args: {
    message: "The resource you're looking for could not be found.",
    onDismiss: () => console.log("Error dismissed"),
  },
};

export const AuthenticationError = {
  args: {
    message: "Your session has expired. Please log in again.",
    onDismiss: () => console.log("Error dismissed"),
  },
};

export const NetworkError = {
  args: {
    message:
      "Network connection failed. Please check your internet connection.",
    onDismiss: () => console.log("Error dismissed"),
  },
};

export const ValidationErrorMultiple = {
  args: {
    message:
      "Please correct the following errors: Invalid email format, Password too short.",
    onDismiss: () => console.log("Error dismissed"),
  },
};

export const PermissionError = {
  args: {
    message: "You do not have permission to access this resource.",
    onDismiss: () => console.log("Error dismissed"),
  },
};

export const TimeoutError = {
  args: {
    message: "Request timed out. Please try again.",
    onDismiss: () => console.log("Error dismissed"),
  },
};
