import { apiClient } from '../client';

export const usersApi = {
  getApplicants: () => apiClient.get('/api/applicants')
};