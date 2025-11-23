import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./assets/styles/typography.css";
import App from "./App.jsx";
import TestApp from "./App.test.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
