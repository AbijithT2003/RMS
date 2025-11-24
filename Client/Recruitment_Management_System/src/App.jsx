import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import { AuthProvider } from "./api/context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import LandingPage from "./app/LandingPage/LandingPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
