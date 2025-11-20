/**
 * API Context Index - Central export for all API contexts
 * Import DTOs, examples, and utilities from here
 */

// Auth Context
export {
  AuthDTOs,
  AuthExamples,
  AuthValidation
} from './auth.context.js';

// Jobs Context
export {
  JobDTOs,
  JobExamples,
  JobEnums,
  JobValidation
} from './jobs.context.js';

// Applications Context
export {
  ApplicationDTOs,
  ApplicationExamples,
  ApplicationEnums,
  ApplicationValidation,
  ApplicationStatusFlow
} from './applications.context.js';

// Skills Context
export {
  SkillDTOs,
  SkillExamples,
  SkillEnums,
  SkillValidation,
  SkillUtils
} from './skills.context.js';

// Interviews Context
export {
  InterviewDTOs,
  InterviewExamples,
  InterviewEnums,
  InterviewValidation,
  InterviewUtils
} from './interviews.context.js';

// Users Context
export {
  UserDTOs,
  UserExamples,
  UserEnums,
  UserValidation,
  UserUtils,
  UserPermissions
} from './users.context.js';

// Common API Response Structure
export const CommonDTOs = {
  ApiResponse: {
    success: "boolean",
    message: "string", // optional
    data: "T", // generic type
    errors: ["string"], // optional array of error messages
    timestamp: "string" // ISO date string
  },
  
  PageResponse: {
    content: ["T"], // array of items
    pageNumber: "number", // current page (0-based)
    pageSize: "number", // items per page
    totalElements: "number", // total items across all pages
    totalPages: "number", // total number of pages
    last: "boolean", // is this the last page
    first: "boolean" // is this the first page
  }
};

// Common validation utilities
export const CommonValidation = {
  isValidUUID: (uuid) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  },
  
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  isValidDate: (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  },
  
  isFutureDate: (dateString) => {
    const date = new Date(dateString);
    return date > new Date();
  }
};

// Common utility functions
export const CommonUtils = {
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  },
  
  formatDateTime: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  },
  
  formatRelativeTime: (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return CommonUtils.formatDate(dateString);
  },
  
  extractErrorMessage: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.data?.errors?.length > 0) {
      return error.response.data.errors.join(', ');
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },
  
  buildQueryParams: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value.toString());
      }
    });
    return searchParams.toString();
  }
};

// Usage examples for common patterns
export const CommonExamples = {
  handleApiCall: `
    import { CommonUtils } from '../context';
    
    const handleApiCall = async (apiFunction, ...args) => {
      try {
        const response = await apiFunction(...args);
        return { success: true, data: response };
      } catch (error) {
        const message = CommonUtils.extractErrorMessage(error);
        return { success: false, error: message };
      }
    };
  `,
  
  usePagination: `
    import { useState, useEffect } from 'react';
    
    const usePagination = (apiFunction, initialPage = 0, initialSize = 10) => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [page, setPage] = useState(initialPage);
      const [size, setSize] = useState(initialSize);
      
      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await apiFunction(page, size);
            setData(response);
          } catch (err) {
            setError(CommonUtils.extractErrorMessage(err));
          } finally {
            setLoading(false);
          }
        };
        
        fetchData();
      }, [page, size]);
      
      return { data, loading, error, page, size, setPage, setSize };
    };
  `
};