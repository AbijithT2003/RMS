import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  JobListPage,
  MyApplicationsPage,
  ManageApplicationsPage,
  MyInterviewsPage,
  InterviewSchedulePage,
  CreateJobPage,
  EditJobPage,
  ManageJobsPage,
  UserManagementPage,
  SkillsManagementPage,
  AuthPage,
  NotFoundPage,
} from "../pages";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import LandingPage from "../app/layout/LandingPage/LandingPage";
import ApplicantDashboard from "../app/dashboard/ApplicantDashboard";
import RecruiterDashboard from "../app/dashboard/RecruiterDashboard";
import AdminDashboard from "../pages/admin/AdminDashboardPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Dashboard Routes */}
      <Route path="/applicant-dashboard" element={
        <ProtectedRoute allowedRoles={["CANDIDATE"]}>
          <ApplicantDashboard />
        </ProtectedRoute>
      } />
      <Route path="/recruiter-dashboard" element={
        <ProtectedRoute allowedRoles={["RECRUITER"]}>
          <RecruiterDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin-dashboard" element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <AdminDashboard />
        </ProtectedRoute>
      } />



      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
