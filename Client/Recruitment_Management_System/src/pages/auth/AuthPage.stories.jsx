import React from "react";
import { MemoryRouter } from "react-router-dom";
import AuthPage from "./AuthPage";

export default {
  title: "Pages/AuthPage",
  component: AuthPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    () => (
      <MemoryRouter initialEntries={["/auth"]}>
        <AuthPage />
      </MemoryRouter>
    ),
  ],
};

export const LoginMode = {
  decorators: [
    () => (
      <MemoryRouter initialEntries={["/auth?mode=login"]}>
        <AuthPage />
      </MemoryRouter>
    ),
  ],
};

export const RegisterMode = {
  decorators: [
    () => (
      <MemoryRouter initialEntries={["/auth?mode=register"]}>
        <AuthPage />
      </MemoryRouter>
    ),
  ],
};

export const Default = {};