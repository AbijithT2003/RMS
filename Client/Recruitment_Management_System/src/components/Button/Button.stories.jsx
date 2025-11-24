import React from "react";
import Button from "./Button";

export default {
  title: "Components/Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    onClick: { action: "clicked" },
  },
};

export const Primary = {
  args: {
    children: "Button",
    variant: "primary",
    size: "medium",
  },
};

export const Secondary = {
  args: {
    children: "Button",
    variant: "secondary",
    size: "medium",
  },
};

export const Danger = {
  args: {
    children: "Delete",
    variant: "danger",
    size: "medium",
  },
};

export const Small = {
  args: {
    children: "Small Button",
    size: "small",
  },
};

export const Large = {
  args: {
    children: "Large Button",
    size: "large",
  },
};

export const Disabled = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const AllVariants = () => (
  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="outline">Outline</Button>
  </div>
);

export const AllSizes = () => (
  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </div>
);