/**
 * Users API Context - DTOs and Usage Examples
 * Matches backend DTOs: CreateUserRequest, UserResponse
 */

// DTO Structures (for reference)
export const UserDTOs = {
  CreateUserRequest: {
    email: "string", // required, valid email
    fullName: "string", // required, 2-100 chars
    password: "string", // required, min 6 chars
    phone: "string", // optional
    role: "string" // required: APPLICANT, RECRUITER, ADMIN
  },
  
  UserResponse: {
    id: "UUID",
    email: "string",
    fullName: "string",
    phone: "string",
    roles: ["string"], // array of role names
    applicantId: "UUID", // if user has APPLICANT role
    recruiterId: "UUID", // if user has RECRUITER role
    isActive: "boolean",
    createdAt: "string",
    updatedAt: "string"
  }
};

// Usage Examples
export const UserExamples = {
  createUser: {
    request: {
      email: "john.recruiter@company.com",
      fullName: "John Recruiter",
      password: "securepass123",
      phone: "+1234567890",
      role: "RECRUITER"
    },
    usage: `
      import { usersApi } from '../endpoints/users.api.js';
      
      const createNewUser = async (userData) => {
        try {
          const user = await usersApi.createUser(userData);
          return user;
        } catch (error) {
          console.error('User creation failed:', error);
          throw error;
        }
      };
    `
  },
  
  getUserByValue: {
    usage: `
      import { usersApi } from '../endpoints/users.api.js';
      
      // Get user by ID
      const fetchUserById = async (userId) => {
        try {
          const user = await usersApi.getUserByValue(userId);
          return user;
        } catch (error) {
          console.error('Failed to fetch user by ID:', error);
          throw error;
        }
      };
      
      // Get user by email
      const fetchUserByEmail = async (email) => {
        try {
          const user = await usersApi.getUserByValue(email);
          return user;
        } catch (error) {
          console.error('Failed to fetch user by email:', error);
          throw error;
        }
      };
    `
  },
  
  getAllUsers: {
    usage: `
      import { usersApi } from '../endpoints/users.api.js';
      
      const fetchAllUsers = async () => {
        try {
          const users = await usersApi.getAllUsers();
          return users;
        } catch (error) {
          console.error('Failed to fetch users:', error);
          throw error;
        }
      };
    `
  }
};

// Enums
export const UserEnums = {
  Role: {
    APPLICANT: "APPLICANT",
    RECRUITER: "RECRUITER",
    ADMIN: "ADMIN"
  }
};

// Validation Helpers
export const UserValidation = {
  validateCreateUserRequest: (data) => {
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
    
    if (!data.role || !Object.values(UserEnums.Role).includes(data.role)) {
      errors.push('Valid role is required');
    }
    
   
    
    return errors;
  },
  
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  validatePassword: (password) => {
    const errors = [];
    
    if (!password) {
      errors.push('Password is required');
      return errors;
    }
    
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    
    if (password.length > 128) {
      errors.push('Password must not exceed 128 characters');
    }
    
    // Optional: Add more password strength requirements
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    return errors;
  }
};

// Utility functions
export const UserUtils = {
  getRoleLabel: (role) => {
    const labels = {
      APPLICANT: 'Job Applicant',
      RECRUITER: 'Recruiter',
      ADMIN: 'Administrator'
    };
    return labels[role] || role;
  },
  
  getRoleColor: (role) => {
    const colors = {
      APPLICANT: 'blue',
      RECRUITER: 'green',
      ADMIN: 'purple'
    };
    return colors[role] || 'gray';
  },
  
  hasRole: (user, role) => {
    return user.roles && user.roles.includes(role);
  },
  
  isApplicant: (user) => {
    return UserUtils.hasRole(user, 'APPLICANT');
  },
  
  isRecruiter: (user) => {
    return UserUtils.hasRole(user, 'RECRUITER');
  },
  
  isAdmin: (user) => {
    return UserUtils.hasRole(user, 'ADMIN');
  },
  
  getDisplayName: (user) => {
    return user.fullName || user.email || 'Unknown User';
  },
  
  formatUserInfo: (user) => {
    return {
      id: user.id,
      name: user.fullName,
      email: user.email,
      phone: user.phone,
      roles: user.roles,
      primaryRole: user.roles?.[0] || 'APPLICANT',
      isActive: user.isActive,
      joinedDate: new Date(user.createdAt).toLocaleDateString()
    };
  },
  
  filterUsersByRole: (users, role) => {
    return users.filter(user => UserUtils.hasRole(user, role));
  },
  
  sortUsersByName: (users) => {
    return [...users].sort((a, b) => 
      (a.fullName || '').localeCompare(b.fullName || '')
    );
  },
  
  sortUsersByCreatedDate: (users, ascending = false) => {
    return [...users].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }
};

// Role-based access control helpers
export const UserPermissions = {
  canCreateUser: (currentUser) => {
    return UserUtils.isAdmin(currentUser);
  },
  
  canViewAllUsers: (currentUser) => {
    return UserUtils.isAdmin(currentUser);
  },
  
  canViewUser: (currentUser, targetUser) => {
    // Users can view their own profile, admins can view all
    return currentUser.id === targetUser.id || UserUtils.isAdmin(currentUser);
  },
  
  canManageJobs: (currentUser) => {
    return UserUtils.isRecruiter(currentUser) || UserUtils.isAdmin(currentUser);
  },
  
  canViewApplications: (currentUser) => {
    return UserUtils.isRecruiter(currentUser) || UserUtils.isAdmin(currentUser);
  },
  
  canScheduleInterviews: (currentUser) => {
    return UserUtils.isRecruiter(currentUser) || UserUtils.isAdmin(currentUser);
  },
  
  canManageSkills: (currentUser) => {
    return UserUtils.isAdmin(currentUser);
  }
};