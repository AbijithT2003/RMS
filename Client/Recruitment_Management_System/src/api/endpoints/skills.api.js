import { apiClient } from '../client';

export const skillsApi = {
  getSkills: () => apiClient.get('/api/skills'),
  searchSkills: (params) => apiClient.get('/api/skills/search', { params }),
  getSkillsByJob: (jobId) => apiClient.get(`/api/skills/job/${jobId}`),
  getSkillsByApplicant: (applicantId) => apiClient.get(`/api/skills/applicant/${applicantId}`),
  addSkill: (skillData) => apiClient.post('/api/skills', skillData),
  addSkillToJob: (skillJobData) => apiClient.post('/api/skills/job', skillJobData),
  addSkillToApplicant: (skillApplicantData) => apiClient.post('/api/skills/applicant', skillApplicantData),
  updateSkill: (id, skillData) => apiClient.put(`/api/skills/${id}`, skillData),
  deleteSkill: (id) => apiClient.delete(`/api/skills/${id}`)
};