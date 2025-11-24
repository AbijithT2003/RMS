import React from "react";
import ConfirmDialog from "./ConfirmDialog";

export default {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: { type: "text" },
    },
    message: {
      control: { type: "text" },
    },
    isProcessing: {
      control: { type: "boolean" },
    },
    onConfirm: { action: "confirmed" },
    onCancel: { action: "cancelled" },
  },
};

export const DeleteJob = {
  args: {
    title: "Delete Job Posting",
    message:
      "Are you sure you want to delete this job posting? This action cannot be undone.",
    onConfirm: () => console.log("Job deleted"),
    onCancel: () => console.log("Deletion cancelled"),
    isProcessing: false,
  },
};

export const DeleteApplication = {
  args: {
    title: "Delete Application",
    message:
      "Are you sure you want to remove this application? This will delete all associated data.",
    onConfirm: () => console.log("Application deleted"),
    onCancel: () => console.log("Deletion cancelled"),
    isProcessing: false,
  },
};

export const ConfirmAction = {
  args: {
    title: "Confirm Action",
    message: "This action will archive the selected items. Continue?",
    onConfirm: () => console.log("Action confirmed"),
    onCancel: () => console.log("Action cancelled"),
    isProcessing: false,
  },
};

export const Processing = {
  args: {
    title: "Delete Interview",
    message: "Are you sure you want to delete this interview schedule?",
    onConfirm: () => console.log("Interview deleted"),
    onCancel: () => console.log("Deletion cancelled"),
    isProcessing: true,
  },
};

export const Warning = {
  args: {
    title: "Deactivate Account",
    message:
      "Deactivating your account will prevent you from posting jobs and receiving applications. Continue?",
    onConfirm: () => console.log("Account deactivated"),
    onCancel: () => console.log("Deactivation cancelled"),
    isProcessing: false,
  },
};

export const DiscardChanges = {
  args: {
    title: "Discard Changes",
    message: "You have unsaved changes. Do you want to discard them?",
    onConfirm: () => console.log("Changes discarded"),
    onCancel: () => console.log("Continue editing"),
    isProcessing: false,
  },
};
