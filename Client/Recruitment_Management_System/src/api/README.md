# RMS Frontend API Documentation

This directory contains the frontend API layer that interfaces with the backend Recruitment Management System. All APIs are structured to match the backend DTOs exactly.

## Structure

```
api/
├── client.js              # Axios client configuration
├── interceptors.js         # Request/response interceptors
├── index.js               # Main API exports
├── endpoints/             # API endpoint definitions
│   ├── auth.api.js
│   ├── jobs.api.js
│   ├── applications.api.js
│   ├── skills.api.js
│   ├── interviews.api.js
│   └── users.api.js
└── context/               # DTOs, examples, and utilities
    ├── index.js
    ├── auth.context.js
    ├── jobs.context.js
    ├── applications.context.js
    ├── skills.context.js
    ├── interviews.context.js
    └── users.context.js
```

## Backend API Response Structure

All backend APIs return responses wrapped in `ApiResponse<T>`:

```javascript
{
  success: boolean,
  message?: string,
  data: T,
  errors?: string[],
  timestamp: string
}
```

Paginated responses use `PageResponse<T>`:

```javascript
{
  content: T[],
  pageNumber: number,
  pageSize: number,
  totalElements: number,
  totalPages: number,
  last: boolean,
  first: boolean
}
```

## Usage Examples

### Basic API Call

```javascript
import { authAPI } from '../api';

const login = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    // response contains AuthResponse data
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
```

### Using Context for Validation

```javascript
import { AuthValidation } from '../api';

const validateLogin = (formData) => {
  const errors = AuthValidation.validateLoginRequest(formData);
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }
};
```

### Paginated Data Fetching

```javascript
import { jobsApi } from '../api';

const fetchJobs = async (page = 0, size = 10) => {
  const response = await jobsApi.getJobs(page, size);
  return {
    jobs: response.content,
    pagination: {
      current: response.pageNumber,
      size: response.pageSize,
      total: response.totalElements,
      totalPages: response.totalPages,
      hasNext: !response.last,
      hasPrev: !response.first
    }
  };
};
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /auth/login` - User login
- `POST /auth/register` - User registration  
- `POST /auth/logout` - User logout

### Jobs (`/api/jobs`)
- `GET /jobs` - Get all jobs (paginated)
- `GET /jobs/search` - Search jobs with filters
- `POST /jobs` - Create job (Recruiter/Admin)
- `PUT /jobs/{id}` - Update job (Recruiter/Admin)
- `DELETE /jobs/{id}` - Delete job (Admin)

### Applications (`/api/applications`)
- `GET /applications` - Get all applications (paginated)
- `GET /applications/{id}` - Get application by ID
- `GET /applications/job/{jobId}` - Get applications for job
- `GET /applications/applicant/{applicantId}` - Get applicant's applications
- `POST /applications` - Submit application
- `PATCH /applications/{id}/status` - Update status
- `PATCH /applications/{id}/assign` - Assign recruiter

### Skills (`/api/skills`)
- `GET /skills` - Get all skills
- `GET /skills/search` - Search skills
- `POST /skills` - Create skill (Admin)
- `PUT /skills/{id}` - Update skill (Admin)
- `DELETE /skills/{id}` - Delete skill (Admin)
- `POST /skills/applicant` - Add skill to applicant
- `POST /skills/job` - Add skill to job
- `GET /skills/applicant/{id}` - Get applicant skills
- `GET /skills/job/{id}` - Get job skills

### Interviews (`/api/interviews`)
- `POST /interviews` - Schedule interview
- `PATCH /interviews/{id}` - Update interview
- `GET /interviews/application/{id}` - Get interviews by application
- `GET /interviews/interviewer/{id}` - Get interviews by interviewer

### Users (`/api/users`)
- `POST /users` - Create user (Admin)
- `GET /users/{value}` - Get user by ID or email
- `GET /users` - Get all users (Admin)

## Error Handling

All API calls should be wrapped in try-catch blocks. Use `CommonUtils.extractErrorMessage()` to get user-friendly error messages:

```javascript
import { CommonUtils } from '../api';

try {
  const result = await someApiCall();
} catch (error) {
  const message = CommonUtils.extractErrorMessage(error);
  // Display message to user
}
```

## Role-Based Access

Use `UserPermissions` utilities to check user permissions:

```javascript
import { UserPermissions } from '../api';

const currentUser = getCurrentUser();

if (UserPermissions.canManageJobs(currentUser)) {
  // Show job management UI
}
```

## Enums and Constants

All backend enums are available in context files:

```javascript
import { JobEnums, ApplicationEnums, SkillEnums } from '../api';

const jobTypes = Object.values(JobEnums.JobType);
const applicationStatuses = Object.values(ApplicationEnums.ApplicationStatus);
```

## Best Practices

1. **Always use the context DTOs** for type reference and validation
2. **Handle pagination properly** using the PageResponse structure
3. **Validate data** before sending to backend using validation helpers
4. **Use enums** instead of hardcoded strings
5. **Handle errors gracefully** with proper user feedback
6. **Check permissions** before showing UI elements
7. **Use utility functions** for common operations like date formatting

## Development Notes

- All APIs match backend DTOs exactly
- Response data is automatically extracted from `ApiResponse.data`
- Pagination parameters are consistently named (`page`, `size`)
- All date/time values use ISO string format
- UUIDs are used for all entity IDs
- Authentication token is automatically added to requests