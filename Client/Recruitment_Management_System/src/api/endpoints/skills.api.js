import { apiClient } from '../client';

export const skillsApi = {
  // Public
  getSkills: async () => {
    const res = await apiClient.get('/skills');
    return res.data?.data || res.data; // Returns List<SkillResponse>
  },
  
  searchSkills: async (keyword) => {
    const res = await apiClient.get('/skills/search', { params: { keyword } });
    return res.data?.data || res.data; // Returns List<SkillResponse>
  },
  
  getSkillsByJob: async (jobId) => {
    const res = await apiClient.get(`/skills/job/${jobId}`);
    return res.data?.data || res.data; // Returns List<JobSkillResponse>
  },
  
  getSkillsByApplicant: async (applicantId) => {
    const res = await apiClient.get(`/skills/applicant/${applicantId}`);
    return res.data?.data || res.data; // Returns List<ApplicantSkillResponse>
  },
  
  // Admin only
  createSkill: async (createSkillRequest) => {
    // CreateSkillRequest: { name, description?, category? }
    const res = await apiClient.post('/skills', createSkillRequest);
    return res.data?.data || res.data; // Returns SkillResponse
  },
  
  updateSkill: async (id, updateSkillRequest) => {
    // UpdateSkillRequest: { name?, description?, category? }
    const res = await apiClient.put(`/skills/${id}`, updateSkillRequest);
    return res.data?.data || res.data; // Returns SkillResponse
  },
  
  deleteSkill: async (id) => {
    const res = await apiClient.delete(`/skills/${id}`);
    return res.data?.data || res.data; // Returns DeleteSkillResponse
  },
  
  // Recruiter/Admin
  addSkillToJob: async (addJobSkillRequest) => {
    // AddJobSkillRequest: { jobId, skillId, required?, proficiencyLevel? }
    const res = await apiClient.post('/skills/job', addJobSkillRequest);
    return res.data?.data || res.data; // Returns JobSkillResponse
  },
  
  // Applicant/Admin
  addSkillToApplicant: async (addApplicantSkillRequest) => {
    // AddApplicantSkillRequest: { applicantId, skillId, proficiencyLevel, yearsOfExperience? }
    const res = await apiClient.post('/skills/applicant', addApplicantSkillRequest);
    return res.data?.data || res.data; // Returns ApplicantSkillResponse
  }
};