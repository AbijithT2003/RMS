
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
  SavedJobsPage,
  ApplicantProfilePage,
  RecruiterProfilePage,
} from "../pages";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import LandingPage from "../app/layout/LandingPage/LandingPage";
import ApplicantDashboard from "../app/dashboard/ApplicantDashboard";
import RecruiterDashboard from "../app/dashboard/RecruiterDashboard";
import AdminDashboard from "../pages/admin/AdminDashboardPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ========== PUBLIC ROUTES ========== */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* ========== APPLICANT ROUTES ========== */}
      <Route
        path="/applicant-dashboard"
        element={
          <ProtectedRoute allowedRoles={["CANDIDATE", "APPLICANT"]}>
            <ApplicantDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applicant/jobs"
        element={
          <ProtectedRoute allowedRoles={["CANDIDATE", "APPLICANT"]}>
            <JobListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applicant/saved-jobs"
        element={
          <ProtectedRoute allowedRoles={["CANDIDATE", "APPLICANT"]}>
            <SavedJobsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applicant/applications"
        element={
          <ProtectedRoute allowedRoles={["CANDIDATE", "APPLICANT"]}>
            <MyApplicationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applicant/interviews"
        element={
          <ProtectedRoute allowedRoles={["CANDIDATE", "APPLICANT"]}>
            <MyInterviewsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applicant/profile"
        element={
          <ProtectedRoute allowedRoles={["CANDIDATE", "APPLICANT"]}>
            <ApplicantProfilePage />
          </ProtectedRoute>
        }
      />

      {/* ========== RECRUITER ROUTES ========== */}
      <Route
        path="/recruiter-dashboard"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/jobs"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <ManageJobsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/jobs/create"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <CreateJobPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/jobs/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <EditJobPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/applications"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <ManageApplicationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/interviews"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <MyInterviewsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/schedule-interview"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <InterviewSchedulePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/profile"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <RecruiterProfilePage />
          </ProtectedRoute>
        }
      />

      {/* ========== ADMIN ROUTES ========== */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/skills"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <SkillsManagementPage />
          </ProtectedRoute>
        }
      />

      {/* ========== ERROR ROUTES ========== */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;