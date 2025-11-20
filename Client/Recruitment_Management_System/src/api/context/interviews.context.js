/**
 * Interviews API Context - DTOs and Usage Examples
 * Matches backend DTOs: CreateInterviewRequest, UpdateInterviewRequest, InterviewResponse
 */

// DTO Structures (for reference)
export const InterviewDTOs = {
  CreateInterviewRequest: {
    applicationId: "UUID", // required
    interviewerId: "UUID", // required
    scheduledAt: "string", // required, ISO date string
    interviewType: "string", // required: PHONE, VIDEO, IN_PERSON, TECHNICAL, HR, FINAL
    platform: "string", // optional: ZOOM, TEAMS, GOOGLE_MEET, PHONE, IN_PERSON
    meetingLink: "string", // optional
    notes: "string" // optional
  },
  
  UpdateInterviewRequest: {
    scheduledAt: "string", // optional, ISO date string
    interviewType: "string", // optional: PHONE, VIDEO, IN_PERSON, TECHNICAL, HR, FINAL
    platform: "string", // optional: ZOOM, TEAMS, GOOGLE_MEET, PHONE, IN_PERSON
    meetingLink: "string", // optional
    notes: "string", // optional
    status: "string", // optional: SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, RESCHEDULED
    result: "string", // optional: PASS, FAIL, PENDING
    feedback: "string" // optional
  },
  
  InterviewResponse: {
    id: "UUID",
    applicationId: "UUID",
    interviewerId: "UUID",
    interviewerName: "string",
    applicantId: "UUID",
    applicantName: "string",
    jobId: "UUID",
    jobTitle: "string",
    scheduledAt: "string",
    interviewType: "string",
    platform: "string",
    meetingLink: "string",
    notes: "string",
    status: "string",
    result: "string",
    feedback: "string",
    createdAt: "string",
    updatedAt: "string"
  }
};

// Usage Examples
export const InterviewExamples = {
  scheduleInterview: {
    request: {
      applicationId: "123e4567-e89b-12d3-a456-426614174000",
      interviewerId: "123e4567-e89b-12d3-a456-426614174001",
      scheduledAt: "2024-01-15T14:00:00Z",
      interviewType: "TECHNICAL",
      platform: "ZOOM",
      meetingLink: "https://zoom.us/j/1234567890",
      notes: "Technical interview focusing on React and Node.js"
    },
    usage: `
      import { interviewsApi } from '../endpoints/interviews.api.js';
      
      const scheduleNewInterview = async (interviewData) => {
        try {
          const interview = await interviewsApi.scheduleInterview(interviewData);
          return interview;
        } catch (error) {
          console.error('Interview scheduling failed:', error);
          throw error;
        }
      };
    `
  },
  
  updateInterview: {
    request: {
      scheduledAt: "2024-01-15T15:00:00Z",
      status: "COMPLETED",
      result: "PASS",
      feedback: "Candidate demonstrated strong technical skills and good problem-solving approach."
    },
    usage: `
      import { interviewsApi } from '../endpoints/interviews.api.js';
      
      const updateInterviewDetails = async (interviewId, updateData) => {
        try {
          const interview = await interviewsApi.updateInterview(interviewId, updateData);
          return interview;
        } catch (error) {
          console.error('Interview update failed:', error);
          throw error;
        }
      };
    `
  },
  
  getInterviewsByApplication: {
    usage: `
      import { interviewsApi } from '../endpoints/interviews.api.js';
      
      const fetchApplicationInterviews = async (applicationId) => {
        try {
          const interviews = await interviewsApi.getInterviewsByApplication(applicationId);
          return interviews;
        } catch (error) {
          console.error('Failed to fetch application interviews:', error);
          throw error;
        }
      };
    `
  },
  
  getInterviewsByInterviewer: {
    usage: `
      import { interviewsApi } from '../endpoints/interviews.api.js';
      
      const fetchMyInterviews = async (interviewerId) => {
        try {
          const interviews = await interviewsApi.getInterviewsByInterviewer(interviewerId);
          return interviews;
        } catch (error) {
          console.error('Failed to fetch interviewer interviews:', error);
          throw error;
        }
      };
    `
  },
  
  getMyInterviews: {
    usage: `
      import { interviewsApi } from '../endpoints/interviews.api.js';
      
      const fetchMyInterviews = async () => {
        try {
          const interviews = await interviewsApi.getMyInterviews();
          return interviews;
        } catch (error) {
          console.error('Failed to fetch my interviews:', error);
          throw error;
        }
      };
    `
  }
};

// Enums
export const InterviewEnums = {
  InterviewType: {
    PHONE: "PHONE",
    VIDEO: "VIDEO",
    IN_PERSON: "IN_PERSON",
    TECHNICAL: "TECHNICAL",
    HR: "HR",
    FINAL: "FINAL"
  },
  
  Platform: {
    ZOOM: "ZOOM",
    TEAMS: "TEAMS",
    GOOGLE_MEET: "GOOGLE_MEET",
    PHONE: "PHONE",
    IN_PERSON: "IN_PERSON"
  },
  
  InterviewStatus: {
    SCHEDULED: "SCHEDULED",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    RESCHEDULED: "RESCHEDULED"
  },
  
  InterviewResult: {
    PASS: "PASS",
    FAIL: "FAIL",
    PENDING: "PENDING"
  }
};

// Validation Helpers
export const InterviewValidation = {
  validateCreateInterviewRequest: (data) => {
    const errors = [];
    
    if (!data.applicationId) {
      errors.push('Application ID is required');
    }
    
    if (!data.interviewerId) {
      errors.push('Interviewer ID is required');
    }
    
    if (!data.scheduledAt) {
      errors.push('Scheduled date and time is required');
    } else {
      const scheduledDate = new Date(data.scheduledAt);
      if (scheduledDate <= new Date()) {
        errors.push('Interview must be scheduled for a future date and time');
      }
    }
    
    if (!data.interviewType || !Object.values(InterviewEnums.InterviewType).includes(data.interviewType)) {
      errors.push('Valid interview type is required');
    }
    
    if (data.platform && !Object.values(InterviewEnums.Platform).includes(data.platform)) {
      errors.push('Invalid platform specified');
    }
    
    if (data.meetingLink && !isValidUrl(data.meetingLink)) {
      errors.push('Meeting link must be a valid URL');
    }
    
    return errors;
  },
  
  validateUpdateInterviewRequest: (data) => {
    const errors = [];
    
    if (data.scheduledAt) {
      const scheduledDate = new Date(data.scheduledAt);
      if (isNaN(scheduledDate.getTime())) {
        errors.push('Invalid scheduled date format');
      }
    }
    
    if (data.interviewType && !Object.values(InterviewEnums.InterviewType).includes(data.interviewType)) {
      errors.push('Invalid interview type');
    }
    
    if (data.platform && !Object.values(InterviewEnums.Platform).includes(data.platform)) {
      errors.push('Invalid platform');
    }
    
    if (data.status && !Object.values(InterviewEnums.InterviewStatus).includes(data.status)) {
      errors.push('Invalid interview status');
    }
    
    if (data.result && !Object.values(InterviewEnums.InterviewResult).includes(data.result)) {
      errors.push('Invalid interview result');
    }
    
    if (data.meetingLink && !isValidUrl(data.meetingLink)) {
      errors.push('Meeting link must be a valid URL');
    }
    
    return errors;
  }
};

// Helper function for URL validation
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Utility functions
export const InterviewUtils = {
  getInterviewTypeLabel: (type) => {
    const labels = {
      PHONE: 'Phone Interview',
      VIDEO: 'Video Interview',
      IN_PERSON: 'In-Person Interview',
      TECHNICAL: 'Technical Interview',
      HR: 'HR Interview',
      FINAL: 'Final Interview'
    };
    return labels[type] || type;
  },
  
  getPlatformLabel: (platform) => {
    const labels = {
      ZOOM: 'Zoom',
      TEAMS: 'Microsoft Teams',
      GOOGLE_MEET: 'Google Meet',
      PHONE: 'Phone Call',
      IN_PERSON: 'In-Person'
    };
    return labels[platform] || platform;
  },
  
  getStatusColor: (status) => {
    const colors = {
      SCHEDULED: 'blue',
      IN_PROGRESS: 'orange',
      COMPLETED: 'green',
      CANCELLED: 'red',
      RESCHEDULED: 'yellow'
    };
    return colors[status] || 'gray';
  },
  
  getResultColor: (result) => {
    const colors = {
      PASS: 'green',
      FAIL: 'red',
      PENDING: 'orange'
    };
    return colors[result] || 'gray';
  },
  
  formatInterviewDateTime: (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      full: date.toLocaleString()
    };
  },
  
  isInterviewUpcoming: (scheduledAt) => {
    const now = new Date();
    const interviewDate = new Date(scheduledAt);
    return interviewDate > now;
  },
  
  getTimeUntilInterview: (scheduledAt) => {
    const now = new Date();
    const interviewDate = new Date(scheduledAt);
    const diffMs = interviewDate - now;
    
    if (diffMs <= 0) return 'Past';
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  }
};