import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import { AuthProvider } from "./api/context/AuthContext";
import { NotificationProvider } from "./api/context/NotificationContext";
import AppRoutes from "./routes/AppRoutes";
import LandingPage from "./app/LandingPage/LandingPage.jsx";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppRoutes />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
