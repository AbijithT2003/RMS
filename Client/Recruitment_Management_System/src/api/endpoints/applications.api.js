import { apiClient } from '../client';

export const applicationsApi = {
  getApplications: () => apiClient.get('/api/applications'),
  getApplicationById: (id) => apiClient.get(`/api/applications/${id}`),
  getApplicationsByJob: (jobId) => apiClient.get(`/api/applications/job/${jobId}`),
  getApplicationsByApplicant: (applicantId) => apiClient.get(`/api/applications/applicant/${applicantId}`),
  updateApplicationStatus: (id, status) => apiClient.patch(`/api/applications/${id}/status`, { status }),
  assignRecruiter: (id, recruiterId) => apiClient.patch(`/api/applications/${id}/assign`, { recruiterId }),
  applyToJob: (applicationData) => apiClient.post('/api/applications', applicationData)
};