/**
 * Applications API Context - DTOs and Usage Examples
 * Matches backend DTOs: CreateJobApplicationRequest, JobApplicationResponse
 */

// DTO Structures (for reference)
export const ApplicationDTOs = {
  CreateJobApplicationRequest: {
    jobId: "UUID", // required
    applicantId: "UUID", // required
    coverLetter: "string", // optional
    resumeUrl: "string" // optional
  },
  
  JobApplicationResponse: {
    id: "UUID",
    jobId: "UUID",
    applicantId: "UUID",
    recruiterId: "UUID", // assigned recruiter
    status: "string", // ApplicationStatus enum
    coverLetter: "string",
    resumeUrl: "string",
    appliedAt: "string", // ISO date
    updatedAt: "string", // ISO date
    // Additional fields from joins
    jobTitle: "string",
    applicantName: "string",
    recruiterName: "string"
  }
};

// Usage Examples
export const ApplicationExamples = {
  getApplications: {
    usage: `
      import { applicationsApi } from '../endpoints/applications.api.js';
      
      const fetchApplications = async (page = 0, size = 10) => {
        try {
          const response = await applicationsApi.getApplications(page, size);
          // response.content contains JobApplicationResponse[]
          return response;
        } catch (error) {
          console.error('Failed to fetch applications:', error);
          throw error;
        }
      };
    `
  },
  
  getApplicationsByJob: {
    usage: `
      import { applicationsApi } from '../endpoints/applications.api.js';
      
      const fetchJobApplications = async (jobId, page = 0, size = 10) => {
        try {
          const response = await applicationsApi.getApplicationsByJob(jobId, page, size);
          return response;
        } catch (error) {
          console.error('Failed to fetch job applications:', error);
          throw error;
        }
      };
    `
  },
  
  applyToJob: {
    request: {
      jobId: "123e4567-e89b-12d3-a456-426614174000",
      applicantId: "123e4567-e89b-12d3-a456-426614174001",
      coverLetter: "I am very interested in this position because...",
      resumeUrl: "https://example.com/resume.pdf"
    },
    usage: `
      import { applicationsApi } from '../endpoints/applications.api.js';
      
      const submitApplication = async (applicationData) => {
        try {
          const response = await applicationsApi.applyToJob(applicationData);
          return response;
        } catch (error) {
          console.error('Application submission failed:', error);
          throw error;
        }
      };
    `
  },
  
  updateApplicationStatus: {
    usage: `
      import { applicationsApi } from '../endpoints/applications.api.js';
      
      const updateStatus = async (applicationId, newStatus) => {
        try {
          const response = await applicationsApi.updateApplicationStatus(applicationId, newStatus);
          return response;
        } catch (error) {
          console.error('Status update failed:', error);
          throw error;
        }
      };
    `
  },
  
  getMyApplications: {
    usage: `
      import { applicationsApi } from '../endpoints/applications.api.js';
      
      const fetchMyApplications = async (page = 0, size = 10) => {
        try {
          const response = await applicationsApi.getMyApplications(page, size);
          return response;
        } catch (error) {
          console.error('Failed to fetch my applications:', error);
          throw error;
        }
      };
    `
  }
};

// Enums
export const ApplicationEnums = {
  ApplicationStatus: {
    PENDING: "PENDING",
    UNDER_REVIEW: "UNDER_REVIEW",
    SHORTLISTED: "SHORTLISTED",
    INTERVIEW_SCHEDULED: "INTERVIEW_SCHEDULED",
    INTERVIEWED: "INTERVIEWED",
    SELECTED: "SELECTED",
    REJECTED: "REJECTED",
    WITHDRAWN: "WITHDRAWN"
  }
};

// Validation Helpers
export const ApplicationValidation = {
  validateCreateApplicationRequest: (data) => {
    const errors = [];
    
    if (!data.jobId) {
      errors.push('Job ID is required');
    }
    
    if (!data.applicantId) {
      errors.push('Applicant ID is required');
    }
    
    // Cover letter and resume URL are optional but can be validated if provided
    if (data.coverLetter && data.coverLetter.length > 2000) {
      errors.push('Cover letter must not exceed 2000 characters');
    }
    
    
    
    return errors;
  },
  
  validateStatusUpdate: (status) => {
    if (!Object.values(ApplicationEnums.ApplicationStatus).includes(status)) {
      return ['Invalid application status'];
    }
    return [];
  }
};


// Status flow helpers
export const ApplicationStatusFlow = {
  getNextPossibleStatuses: (currentStatus) => {
    const flows = {
      PENDING: ['UNDER_REVIEW', 'REJECTED'],
      UNDER_REVIEW: ['SHORTLISTED', 'REJECTED'],
      SHORTLISTED: ['INTERVIEW_SCHEDULED', 'REJECTED'],
      INTERVIEW_SCHEDULED: ['INTERVIEWED', 'REJECTED'],
      INTERVIEWED: ['SELECTED', 'REJECTED'],
      SELECTED: [], // Final state
      REJECTED: [], // Final state
      WITHDRAWN: [] // Final state
    };
    
    return flows[currentStatus] || [];
  },
  
  canTransitionTo: (fromStatus, toStatus) => {
    const possibleStatuses = ApplicationStatusFlow.getNextPossibleStatuses(fromStatus);
    return possibleStatuses.includes(toStatus);
  }
};