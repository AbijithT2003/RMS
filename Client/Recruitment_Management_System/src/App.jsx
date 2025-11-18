import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import LandingPage from "./app/layout/LandingPage/LandingPage.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import ApplicantDashboard from "./app/dashboard/ApplicantDashboard.jsx";
import RecruiterDashboard from "./app/dashboard/RecruiterDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/applicant-dashboard" element={<ApplicantDashboard />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;