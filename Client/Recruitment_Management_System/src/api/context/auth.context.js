/**
 * Auth API Context - DTOs and Usage Examples
 * Matches backend DTOs: LoginRequest, RegisterRequest, AuthResponse
 */

// DTO Structures (for reference)
export const AuthDTOs = {
  LoginRequest: {
    email: "string", // required, valid email
    password: "string" // required, min 6 chars
  },
  
  RegisterRequest: {
    email: "string", // required, valid email
    fullName: "string", // required, 2-100 chars
    password: "string", // required, min 6 chars
    phone: "string", // optional
    role: "string" // required: APPLICANT, RECRUITER, ADMIN
  },
  
  AuthResponse: {
    accessToken: "string",
    tokenType: "string", // "Bearer"
    userId: "UUID",
    email: "string",
    fullName: "string",
    applicantId: "UUID", // if role is APPLICANT
    recruiterId: "UUID", // if role is RECRUITER
    roles: ["string"], // array of roles
    expiresIn: "number" // token expiry in seconds
  }
};

// Usage Examples
export const AuthExamples = {
  login: {
    request: {
      email: "john.doe@example.com",
      password: "password123"
    },
    usage: `
      import { authAPI } from '../endpoints/auth.api.js';
      
      const loginUser = async (credentials) => {
        try {
          const response = await authAPI.login(credentials);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response));
          return response;
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      };
    `
  },
  
  register: {
    request: {
      email: "jane.smith@example.com",
      fullName: "Jane Smith",
      password: "securepass123",
      phone: "+1234567890",
      role: "APPLICANT"
    },
    usage: `
      import { authAPI } from '../endpoints/auth.api.js';
      
      const registerUser = async (userData) => {
        try {
          const response = await authAPI.register(userData);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response));
          return response;
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        }
      };
    `
  }
};

// Validation Helpers
export const AuthValidation = {
  validateLoginRequest: (data) => {
    const errors = [];
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.push('Valid email is required');
    }
    if (!data.password || data.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    return errors;
  },
  
  validateRegisterRequest: (data) => {
    const errors = [];
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.push('Valid email is required');
    }
    if (!data.fullName || data.fullName.length < 2 || data.fullName.length > 100) {
      errors.push('Full name must be between 2 and 100 characters');
    }
    if (!data.password || data.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    if (!data.role || !['APPLICANT', 'RECRUITER', 'ADMIN'].includes(data.role)) {
      errors.push('Valid role is required');
    }
    return errors;
  }
};