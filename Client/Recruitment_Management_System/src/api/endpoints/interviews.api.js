import { apiClient } from '../client';

export const interviewsApi = {
  getInterviewsByInterviewer: (id) => apiClient.get(`/api/interviews/interviewer/${id}`),
  getInterviewsByApplication: (id) => apiClient.get(`/api/interviews/application/${id}`),
  scheduleInterview: (interviewData) => apiClient.post('/api/interviews', interviewData),
  updateInterview: (id, interviewData) => apiClient.patch(`/api/interviews/${id}`, interviewData)
};