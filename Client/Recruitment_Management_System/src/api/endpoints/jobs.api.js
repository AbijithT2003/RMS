import { apiClient } from '../client';

export const jobsApi = {
  getJobs: () => apiClient.get('/api/jobs'),
  searchJobs: (params) => apiClient.get('/api/jobs/search', { params }),
  createJob: (jobData) => apiClient.post('/api/jobs', jobData),
  updateJob: (id, jobData) => apiClient.put(`/api/jobs/${id}`, jobData),
  deleteJob: (id) => apiClient.delete(`/api/jobs/${id}`)
};