/**
 * Skills API Context - DTOs and Usage Examples
 * Matches backend DTOs: CreateSkillRequest, AddApplicantSkillRequest, AddJobSkillRequest, etc.
 */

// DTO Structures (for reference)
export const SkillDTOs = {
  CreateSkillRequest: {
    name: "string", // required
    description: "string", // optional
    category: "string" // optional
  },
  
  UpdateSkillRequest: {
    name: "string", // optional
    description: "string", // optional
    category: "string" // optional
  },
  
  SkillResponse: {
    id: "UUID",
    name: "string",
    description: "string",
    category: "string",
    createdAt: "string",
    updatedAt: "string"
  },
  
  AddApplicantSkillRequest: {
    applicantId: "UUID", // required
    skillId: "UUID", // required
    proficiencyLevel: "string", // required: BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
    yearsOfExperience: "number" // optional
  },
  
  ApplicantSkillResponse: {
    id: "UUID",
    applicantId: "UUID",
    skillId: "UUID",
    skillName: "string",
    proficiencyLevel: "string",
    yearsOfExperience: "number",
    createdAt: "string"
  },
  
  AddJobSkillRequest: {
    jobId: "UUID", // required
    skillId: "UUID", // required
    required: "boolean", // optional, default false
    proficiencyLevel: "string" // optional: BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
  },
  
  JobSkillResponse: {
    id: "UUID",
    jobId: "UUID",
    skillId: "UUID",
    skillName: "string",
    required: "boolean",
    proficiencyLevel: "string",
    createdAt: "string"
  }
};

// Usage Examples
export const SkillExamples = {
  getSkills: {
    usage: `
      import { skillsApi } from '../endpoints/skills.api.js';
      
      const fetchAllSkills = async () => {
        try {
          const skills = await skillsApi.getSkills();
          return skills;
        } catch (error) {
          console.error('Failed to fetch skills:', error);
          throw error;
        }
      };
    `
  },
  
  searchSkills: {
    usage: `
      import { skillsApi } from '../endpoints/skills.api.js';
      
      const searchSkills = async (keyword) => {
        try {
          const skills = await skillsApi.searchSkills(keyword);
          return skills;
        } catch (error) {
          console.error('Skill search failed:', error);
          throw error;
        }
      };
    `
  },
  
  createSkill: {
    request: {
      name: "React.js",
      description: "A JavaScript library for building user interfaces",
      category: "Frontend Framework"
    },
    usage: `
      import { skillsApi } from '../endpoints/skills.api.js';
      
      const createNewSkill = async (skillData) => {
        try {
          const skill = await skillsApi.createSkill(skillData);
          return skill;
        } catch (error) {
          console.error('Skill creation failed:', error);
          throw error;
        }
      };
    `
  },
  
  addSkillToApplicant: {
    request: {
      applicantId: "123e4567-e89b-12d3-a456-426614174000",
      skillId: "123e4567-e89b-12d3-a456-426614174001",
      proficiencyLevel: "ADVANCED",
      yearsOfExperience: 3
    },
    usage: `
      import { skillsApi } from '../endpoints/skills.api.js';
      
      const addSkillToProfile = async (skillData) => {
        try {
          const applicantSkill = await skillsApi.addSkillToApplicant(skillData);
          return applicantSkill;
        } catch (error) {
          console.error('Failed to add skill to applicant:', error);
          throw error;
        }
      };
    `
  },
  
  addSkillToJob: {
    request: {
      jobId: "123e4567-e89b-12d3-a456-426614174000",
      skillId: "123e4567-e89b-12d3-a456-426614174001",
      required: true,
      proficiencyLevel: "INTERMEDIATE"
    },
    usage: `
      import { skillsApi } from '../endpoints/skills.api.js';
      
      const addSkillRequirement = async (skillData) => {
        try {
          const jobSkill = await skillsApi.addSkillToJob(skillData);
          return jobSkill;
        } catch (error) {
          console.error('Failed to add skill to job:', error);
          throw error;
        }
      };
    `
  },
  
  getApplicantSkills: {
    usage: `
      import { skillsApi } from '../endpoints/skills.api.js';
      
      const fetchApplicantSkills = async (applicantId) => {
        try {
          const skills = await skillsApi.getSkillsByApplicant(applicantId);
          return skills;
        } catch (error) {
          console.error('Failed to fetch applicant skills:', error);
          throw error;
        }
      };
    `
  },
  
  getJobSkills: {
    usage: `
      import { skillsApi } from '../endpoints/skills.api.js';
      
      const fetchJobSkills = async (jobId) => {
        try {
          const skills = await skillsApi.getSkillsByJob(jobId);
          return skills;
        } catch (error) {
          console.error('Failed to fetch job skills:', error);
          throw error;
        }
      };
    `
  }
};

// Enums
export const SkillEnums = {
  ProficiencyLevel: {
    BEGINNER: "BEGINNER",
    INTERMEDIATE: "INTERMEDIATE", 
    ADVANCED: "ADVANCED",
    EXPERT: "EXPERT"
  },
  
  SkillCategory: {
    PROGRAMMING_LANGUAGE: "Programming Language",
    FRAMEWORK: "Framework",
    DATABASE: "Database",
    CLOUD_PLATFORM: "Cloud Platform",
    TOOL: "Tool",
    SOFT_SKILL: "Soft Skill",
    METHODOLOGY: "Methodology",
    OTHER: "Other"
  }
};

// Validation Helpers
export const SkillValidation = {
  validateCreateSkillRequest: (data) => {
    const errors = [];
    
    if (!data.name || data.name.trim().length === 0) {
      errors.push('Skill name is required');
    }
    
    if (data.name && data.name.length > 100) {
      errors.push('Skill name must not exceed 100 characters');
    }
    
    if (data.description && data.description.length > 500) {
      errors.push('Description must not exceed 500 characters');
    }
    
    return errors;
  },
  
  validateAddApplicantSkillRequest: (data) => {
    const errors = [];
    
    if (!data.applicantId) {
      errors.push('Applicant ID is required');
    }
    
    if (!data.skillId) {
      errors.push('Skill ID is required');
    }
    
    if (!data.proficiencyLevel || !Object.values(SkillEnums.ProficiencyLevel).includes(data.proficiencyLevel)) {
      errors.push('Valid proficiency level is required');
    }
    
    if (data.yearsOfExperience && (data.yearsOfExperience < 0 || data.yearsOfExperience > 50)) {
      errors.push('Years of experience must be between 0 and 50');
    }
    
    return errors;
  },
  
  validateAddJobSkillRequest: (data) => {
    const errors = [];
    
    if (!data.jobId) {
      errors.push('Job ID is required');
    }
    
    if (!data.skillId) {
      errors.push('Skill ID is required');
    }
    
    if (data.proficiencyLevel && !Object.values(SkillEnums.ProficiencyLevel).includes(data.proficiencyLevel)) {
      errors.push('Invalid proficiency level');
    }
    
    return errors;
  }
};

// Utility functions
export const SkillUtils = {
  getProficiencyLevelOrder: () => {
    return ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
  },
  
  compareProficiencyLevels: (level1, level2) => {
    const order = SkillUtils.getProficiencyLevelOrder();
    return order.indexOf(level1) - order.indexOf(level2);
  },
  
  formatProficiencyLevel: (level) => {
    return level.charAt(0) + level.slice(1).toLowerCase();
  },
  
  groupSkillsByCategory: (skills) => {
    return skills.reduce((groups, skill) => {
      const category = skill.category || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(skill);
      return groups;
    }, {});
  }
};