import { apiClient } from "../client";

export const jobsApi = {
  // Public - accessible to all roles
  getAllJobs: async (page = 0, size = 10) => {
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

  // Recruiter/Admin only
  getJobsByRecruiter: async () => {
    const res = await apiClient.get("/jobs/my", {
      params: { page: 0, size: 1000 },
    }); // Get all jobs for recruiter (up to 1000)
    const maybeData = res.data?.data || res.data;
    return maybeData?.content || maybeData;
  },

  searchJobs: async (filters, page = 0, size = 50) => {
  const params = new URLSearchParams();

  if (filters.keyword) params.append("keyword", filters.keyword);
  if (filters.jobType !== "ALL") params.append("jobType", filters.jobType);
  if (filters.workMode !== "ALL") params.append("workMode", filters.workMode);
  if (filters.location !== "ALL") params.append("locationCity", filters.location);

  params.append("status", "ACTIVE");
  params.append("page", page);
  params.append("size", size);

  const res = await apiClient.get(`/jobs/search?${params.toString()}`);
  return res.data.data;
}
,

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
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const applicantId = user.applicantId || user.userId;
    const res = await apiClient.get(`/jobs/saved/${applicantId}`);
    return res.data?.data || res.data; // Returns Array<JobResponse>
  },

  saveJob: async (jobId) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const applicantId = user.applicantId || user.userId;
    const res = await apiClient.post(`/jobs/${jobId}/save`, { applicantId });
    return res.data?.data || res.data;
  },

  unsaveJob: async (jobId) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const applicantId = user.applicantId || user.userId;
    const res = await apiClient.delete(`/jobs/${jobId}/save/${applicantId}`);
    return res.data?.data || res.data;
  },
};
