/**
 * API Module Index - Central export for all API functionality
 */

// API Client
export { apiClient } from './client.js';

// API Endpoints
export { authAPI } from './endpoints/auth.api.js';
export { jobsApi } from './endpoints/jobs.api.js';
export { applicationsApi } from './endpoints/applications.api.js';
export { skillsApi } from './endpoints/skills.api.js';
export { interviewsApi } from './endpoints/interviews.api.js';
export { usersApi } from './endpoints/users.api.js';

// API Context (DTOs, Examples, Validation, Utils)
export * from './context/index.js';

// Convenience exports for common usage
export const api = {
  auth: () => import('./endpoints/auth.api.js').then(m => m.authAPI),
  jobs: () => import('./endpoints/jobs.api.js').then(m => m.jobsApi),
  applications: () => import('./endpoints/applications.api.js').then(m => m.applicationsApi),
  skills: () => import('./endpoints/skills.api.js').then(m => m.skillsApi),
  interviews: () => import('./endpoints/interviews.api.js').then(m => m.interviewsApi),
  users: () => import('./endpoints/users.api.js').then(m => m.usersApi)
};