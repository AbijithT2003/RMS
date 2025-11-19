import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import {
  JobListPage,
  MyApplicationsPage,
  ManageApplicationsPage,
  MyInterviewsPage,
  InterviewSchedulePage,
  CreateJobPage,
  ManageJobsPage,
  UserManagementPage,
  SkillsManagementPage,
  AuthPage,
  NotFoundPage
} from '../pages';
import UnauthorizedPage from '../pages/UnauthorizedPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Applicant Routes */}
      <Route path="/applicant/jobs" element={
        <ProtectedRoute allowedRoles={['APPLICANT']}>
          <JobListPage />
        </ProtectedRoute>
      } />
      <Route path="/applicant/applications" element={
        <ProtectedRoute allowedRoles={['APPLICANT']}>
          <MyApplicationsPage />
        </ProtectedRoute>
      } />
      <Route path="/applicant/interviews" element={
        <ProtectedRoute allowedRoles={['APPLICANT']}>
          <MyInterviewsPage />
        </ProtectedRoute>
      } />
      
      {/* Recruiter Routes */}
      <Route path="/recruiter/jobs" element={
        <ProtectedRoute allowedRoles={['RECRUITER']}>
          <ManageJobsPage />
        </ProtectedRoute>
      } />
      <Route path="/recruiter/jobs/create" element={
        <ProtectedRoute allowedRoles={['RECRUITER']}>
          <CreateJobPage />
        </ProtectedRoute>
      } />
      <Route path="/recruiter/applications" element={
        <ProtectedRoute allowedRoles={['RECRUITER']}>
          <ManageApplicationsPage />
        </ProtectedRoute>
      } />
      <Route path="/recruiter/interviews" element={
        <ProtectedRoute allowedRoles={['RECRUITER']}>
          <MyInterviewsPage />
        </ProtectedRoute>
      } />
      <Route path="/recruiter/interviews/schedule" element={
        <ProtectedRoute allowedRoles={['RECRUITER']}>
          <InterviewSchedulePage />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <UserManagementPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/skills" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <SkillsManagementPage />
        </ProtectedRoute>
      } />
      
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;