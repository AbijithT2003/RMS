/**
 * Jobs API Context - DTOs and Usage Examples
 * Matches backend DTOs: CreateJobRequest, UpdateJobRequest, JobResponse
 */

// DTO Structures (for reference)
export const JobDTOs = {
  CreateJobRequest: {
    title: "string", // required, 3-100 chars
    department: "string", // optional, max 50 chars
    sector: "string", // optional, max 50 chars
    description: "string", // required, 50-5000 chars
    requirements: "string", // optional, max 2000 chars
    jobType: "string", // required: FULL_TIME, PART_TIME, CONTRACT, INTERN, TEMPORARY
    workMode: "string", // required: REMOTE, HYBRID, ONSITE
    locationCity: "string", // optional, max 100 chars
    locationState: "string", // optional, max 100 chars
    locationCountry: "string", // optional, max 100 chars
    salaryMin: "number", // optional, decimal
    salaryMax: "number", // optional, decimal
    experienceRequired: "number", // optional, integer
    status: "string", // required: ACTIVE, INACTIVE, CLOSED
    applicationDeadline: "string", // optional, ISO date string (future)
    positionsAvailable: "number" // optional, min 1
  },
  
  JobResponse: {
    id: "UUID",
    createdById: "UUID",
    createdByName: "string",
    title: "string",
    department: "string",
    sector: "string",
    description: "string",
    requirements: "string",
    jobType: "string",
    workMode: "string",
    locationCity: "string",
    locationState: "string",
    locationCountry: "string",
    salaryMin: "number",
    salaryMax: "number",
    experienceRequired: "number",
    status: "string",
    applicationDeadline: "string",
    positionsAvailable: "number",
    createdAt: "string",
    updatedAt: "string"
  },
  
  SearchParams: {
    status: "string", // optional: ACTIVE, INACTIVE, CLOSED
    keyword: "string", // optional
    jobType: "string", // optional: FULL_TIME, PART_TIME, CONTRACT, INTERN, TEMPORARY
    workMode: "string", // optional: REMOTE, HYBRID, ONSITE
    locationCity: "string", // optional
    page: "number", // optional, default 0
    size: "number" // optional, default 10
  }
};

// Usage Examples
export const JobExamples = {
  getJobs: {
    usage: `
      import { jobsApi } from '../endpoints/jobs.api.js';
      
      const fetchJobs = async (page = 0, size = 10) => {
        try {
          const response = await jobsApi.getJobs(page, size);
          // response.content contains JobResponse[]
          // response.totalElements, totalPages, etc. for pagination
          return response;
        } catch (error) {
          console.error('Failed to fetch jobs:', error);
          throw error;
        }
      };
    `
  },
  
  searchJobs: {
    request: {
      keyword: "software engineer",
      jobType: "FULL_TIME",
      workMode: "REMOTE",
      locationCity: "San Francisco",
      page: 0,
      size: 20
    },
    usage: `
      import { jobsApi } from '../endpoints/jobs.api.js';
      
      const searchJobs = async (filters) => {
        try {
          const response = await jobsApi.searchJobs(filters);
          return response;
        } catch (error) {
          console.error('Job search failed:', error);
          throw error;
        }
      };
    `
  },
  
  createJob: {
    request: {
      title: "Senior Software Engineer",
      department: "Engineering",
      sector: "Technology",
      description: "We are looking for a senior software engineer to join our team...",
      requirements: "5+ years of experience in React, Node.js, and cloud technologies",
      jobType: "FULL_TIME",
      workMode: "HYBRID",
      locationCity: "San Francisco",
      locationState: "CA",
      locationCountry: "USA",
      salaryMin: 120000,
      salaryMax: 180000,
      experienceRequired: 5,
      status: "ACTIVE",
      applicationDeadline: "2024-12-31T23:59:59",
      positionsAvailable: 2
    },
    usage: `
      import { jobsApi } from '../endpoints/jobs.api.js';
      
      const createNewJob = async (jobData) => {
        try {
          const response = await jobsApi.createJob(jobData);
          return response;
        } catch (error) {
          console.error('Job creation failed:', error);
          throw error;
        }
      };
    `
  }
};

// Enums
export const JobEnums = {
  JobType: {
    FULL_TIME: "FULL_TIME",
    PART_TIME: "PART_TIME",
    CONTRACT: "CONTRACT",
    INTERN: "INTERN",
    TEMPORARY: "TEMPORARY"
  },
  
  WorkMode: {
    REMOTE: "REMOTE",
    HYBRID: "HYBRID",
    ONSITE: "ONSITE"
  },
  
  JobStatus: {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    CLOSED: "CLOSED"
  }
};

// Validation Helpers
export const JobValidation = {
  validateCreateJobRequest: (data) => {
    const errors = [];
    
    if (!data.title || data.title.length < 3 || data.title.length > 100) {
      errors.push('Title must be between 3 and 100 characters');
    }
    
    if (!data.description || data.description.length < 50 || data.description.length > 5000) {
      errors.push('Description must be between 50 and 5000 characters');
    }
    
    if (!data.jobType || !Object.values(JobEnums.JobType).includes(data.jobType)) {
      errors.push('Valid job type is required');
    }
    
    if (!data.workMode || !Object.values(JobEnums.WorkMode).includes(data.workMode)) {
      errors.push('Valid work mode is required');
    }
    
    if (!data.status || !Object.values(JobEnums.JobStatus).includes(data.status)) {
      errors.push('Valid status is required');
    }
    
    if (data.salaryMin && data.salaryMax && data.salaryMin > data.salaryMax) {
      errors.push('Minimum salary cannot be greater than maximum salary');
    }
    
    if (data.applicationDeadline && new Date(data.applicationDeadline) <= new Date()) {
      errors.push('Application deadline must be in the future');
    }
    
    return errors;
  }
};