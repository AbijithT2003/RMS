import { apiClient } from '../client';

export const interviewsApi = {
  // All roles
  getInterviewsByApplication: async (applicationId) => {
    const res = await apiClient.get(`/interviews/application/${applicationId}`);
    return res.data?.data || res.data; // Returns List<InterviewResponse>
  },
  
  getInterviewsByInterviewer: async (interviewerId) => {
    const res = await apiClient.get(`/interviews/interviewer/${interviewerId}`);
    return res.data?.data || res.data; // Returns List<InterviewResponse>
  },
  
  // Role-specific
  getMyInterviews: async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.roles?.includes('RECRUITER') || user.role === 'RECRUITER') {
      const interviewerId = user.recruiterId || user.userId;
      return interviewsApi.getInterviewsByInterviewer(interviewerId);
    } else {
      // For applicants, we need to get interviews through their applications
      // This would require a different endpoint or approach
      throw new Error('Applicant interview retrieval not directly supported by current backend');
    }
  },
  
  // Recruiter/Admin only
  scheduleInterview: async (createInterviewRequest) => {
    // CreateInterviewRequest: { applicationId, interviewerId, scheduledAt, interviewType, platform?, meetingLink?, notes? }
    const res = await apiClient.post('/interviews', createInterviewRequest);
    return res.data?.data || res.data; // Returns InterviewResponse
  },
  
  updateInterview: async (id, updateInterviewRequest) => {
    // UpdateInterviewRequest: { scheduledAt?, interviewType?, platform?, meetingLink?, notes?, status?, result?, feedback? }
    const res = await apiClient.patch(`/interviews/${id}`, updateInterviewRequest);
    return res.data?.data || res.data; // Returns InterviewResponse
  }
};