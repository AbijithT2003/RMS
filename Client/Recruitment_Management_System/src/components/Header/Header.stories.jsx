import React, { useState } from "react";
import Header from "./Header";

export default {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    showAuthButtons: {
      control: { type: "boolean" },
    },
  },
};

const HeaderWrapper = (args) => {
  const [_isLoggedIn, setIsLoggedIn] = useState(args.isLoggedIn || false);

  return (
    <Header
      {...args}
      onLogin={() => {
        setIsLoggedIn(true);
        console.log("Login clicked");
      }}
      onRegister={() => console.log("Register clicked")}
      onNavigate={(path) => console.log("Navigate to:", path)}
      onLogout={() => {
        setIsLoggedIn(false);
        console.log("Logout clicked");
      }}
    />
  );
};

export const Default = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    showAuthButtons: true,
    navigationItems: [
      { label: "Home", path: "/" },
      { label: "Browse Jobs", path: "/jobs" },
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
    isLoggedIn: false,
  },
};

export const LoggedIn = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    showAuthButtons: false,
    navigationItems: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Applications", path: "/applications" },
      { label: "Browse Jobs", path: "/jobs" },
      { label: "Messages", path: "/messages" },
    ],
    isLoggedIn: true,
    userEmail: "user@example.com",
  },
};

export const RecruiterHeader = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    showAuthButtons: false,
    navigationItems: [
      { label: "Dashboard", path: "/recruiter/dashboard" },
      { label: "Manage Jobs", path: "/recruiter/jobs" },
      { label: "Applications", path: "/recruiter/applications" },
      { label: "Team", path: "/recruiter/team" },
    ],
    isLoggedIn: true,
    userRole: "recruiter",
  },
};

export const WithoutNavigation = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    showAuthButtons: true,
    navigationItems: [],
    isLoggedIn: false,
  },
};

export const ManyNavigationItems = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    showAuthButtons: true,
    navigationItems: [
      { label: "Home", path: "/" },
      { label: "Browse Jobs", path: "/jobs" },
      { label: "For Recruiters", path: "/recruiters" },
      { label: "About Us", path: "/about" },
      { label: "Blog", path: "/blog" },
      { label: "Contact", path: "/contact" },
      { label: "FAQ", path: "/faq" },
    ],
    isLoggedIn: false,
  },
};

export const AdminHeader = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    showAuthButtons: false,
    navigationItems: [
      { label: "Dashboard", path: "/admin" },
      { label: "Users", path: "/admin/users" },
      { label: "Jobs", path: "/admin/jobs" },
      { label: "Applications", path: "/admin/applications" },
      { label: "Reports", path: "/admin/reports" },
      { label: "Settings", path: "/admin/settings" },
    ],
    isLoggedIn: true,
    userRole: "admin",
  },
};

export const CompactHeader = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    showAuthButtons: true,
    navigationItems: [
      { label: "Jobs", path: "/jobs" },
      { label: "About", path: "/about" },
    ],
    isLoggedIn: false,
  },
};

export const WithUserMenu = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    showAuthButtons: false,
    navigationItems: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Jobs", path: "/jobs" },
    ],
    isLoggedIn: true,
    userName: "John Doe",
    hasUserMenu: true,
  },
};
