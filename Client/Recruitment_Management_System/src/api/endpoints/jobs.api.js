import { apiClient } from "../client";

export const jobsApi = {
  // Public - accessible to all roles
  getallJobs: async (page = 0, size = 10) => {
    const res = await apiClient.get("/jobs", { params: { page, size } });
    // Normalize to return an array of jobs when backend returns a paginated PageResponse
    // PageResponse is expected to be in res.data.data and may contain `content`.
    const maybeData = res.data?.data || res.data;
    return maybeData?.content || maybeData; // Returns Array<JobResponse> or fallback object
  },

  getJob: async (id) => {
    const res = await apiClient.get(`/jobs/${id}`);
    return res.data?.data || res.data; // Returns JobResponse
  },

  searchJobs: async (searchParams) => {
    // searchParams: { status?, keyword?, jobType?, workMode?, locationCity?, page?, size? }
    const res = await apiClient.get("/jobs/search", { params: searchParams });
    return res.data?.data || res.data; // Returns PageResponse<JobResponse>
  },

  // Recruiter/Admin only
  createJob: async (createJobRequest) => {
    // CreateJobRequest: { title, department?, sector?, description, requirements?, jobType, workMode, locationCity?, locationState?, locationCountry?, salaryMin?, salaryMax?, experienceRequired?, status, applicationDeadline?, positionsAvailable? }
    const res = await apiClient.post("/jobs", createJobRequest);
    return res.data?.data || res.data; // Returns JobResponse
  },

  updateJob: async (id, updateJobRequest) => {
    // UpdateJobRequest: similar to CreateJobRequest
    const res = await apiClient.put(`/jobs/${id}`, updateJobRequest);
    return res.data?.data || res.data; // Returns JobResponse
  },

  deleteJob: async (id) => {
    const res = await apiClient.delete(`/jobs/${id}`);
    return res.data?.data || res.data; // Returns DeletedJobResponse
  },

  // Applicant only - Saved Jobs
  getSavedJobs: async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const applicantId = user.applicantId || user.userId;
    const res = await apiClient.get(`/jobs/saved/${applicantId}`);
    return res.data?.data || res.data; // Returns Array<JobResponse>
  },

  saveJob: async (jobId) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const applicantId = user.applicantId || user.userId;
    const res = await apiClient.post(`/jobs/${jobId}/save`, { applicantId });
    return res.data?.data || res.data;
  },

  unsaveJob: async (jobId) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const applicantId = user.applicantId || user.userId;
    const res = await apiClient.delete(`/jobs/${jobId}/save/${applicantId}`);
    return res.data?.data || res.data;
  },
};
