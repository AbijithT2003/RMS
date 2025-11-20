import { apiClient } from '../client';

export const applicationsApi = {
  // All roles
  getApplications: async (page = 0, size = 10) => {
    const res = await apiClient.get('/applications', { params: { page, size } });
    return res.data?.data || res.data; // Returns PageResponse<JobApplicationResponse>
  },
  
  getApplicationById: async (id) => {
    const res = await apiClient.get(`/applications/${id}`);
    return res.data?.data || res.data; // Returns JobApplicationResponse
  },
  
  getApplicationsByJob: async (jobId, page = 0, size = 10) => {
    const res = await apiClient.get(`/applications/job/${jobId}`, { params: { page, size } });
    return res.data?.data || res.data; // Returns PageResponse<JobApplicationResponse>
  },
  
  getApplicationsByApplicant: async (applicantId, page = 0, size = 10) => {
    const res = await apiClient.get(`/applications/applicant/${applicantId}`, { params: { page, size } });
    return res.data?.data || res.data; // Returns PageResponse<JobApplicationResponse>
  },
  
  // Applicant specific
  getMyApplications: async (page = 0, size = 10) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const applicantId = user.applicantId || user.userId;
    return applicationsApi.getApplicationsByApplicant(applicantId, page, size);
  },
  
  applyToJob: async (createJobApplicationRequest) => {
    // CreateJobApplicationRequest: { jobId, applicantId, coverLetter?, resumeUrl? }
    const res = await apiClient.post('/applications', createJobApplicationRequest);
    return res.data?.data || res.data; // Returns JobApplicationResponse
  },
  
  // Recruiter/Admin only
  updateApplicationStatus: async (id, status) => {
    const res = await apiClient.patch(`/applications/${id}/status`, null, { params: { status } });
    return res.data?.data || res.data; // Returns JobApplicationResponse
  },
  
  assignRecruiter: async (id, recruiterId) => {
    const res = await apiClient.patch(`/applications/${id}/assign`, null, { params: { recruiterId } });
    return res.data?.data || res.data; // Returns JobApplicationResponse
  }
};