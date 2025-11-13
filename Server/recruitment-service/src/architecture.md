
## Backend Architecture Overview

The Recruitment Management System follows a **layered Spring Boot architecture** with clear separation of concerns:

### 1. **Authentication & Authorization Flow**

```
User Registration/Login → JWT Token Generation → Role-Based Access Control
```

**Flow Steps:**
1. **Registration**: User submits credentials → `AuthenticationController` → `AuthenticationService` → Password encryption → Role assignment → JWT token generation

2. **Login**: Credentials validation → JWT token with roles → Token stored client-side
3. **Authorization**: Each request → `JwtAuthenticationFilter` → Token validation → Role extraction → Access control

### 2. **Job Management Flow**

```
Recruiter Creates Job → Job Posting → Candidate Application → Interview Process
```

**Detailed Flow:**
1. **Job Creation**: Recruiter → `JobController.createJob()` → `JobService` → Database persistence
2. **Job Search**: Public/Candidate → `JobController.searchJobs()` → Filtered results with pagination
3. **Skill Requirements**: Job skills added via `SkillController` → `JobSkillRepository`

### 3. **Application Process Flow**

```
Candidate Applies → Application Review → Interview Scheduling → Decision
```

**Steps:**
1. **Application Submission**: 
   - Candidate → `JobApplicationController.createApplication()`
   - Validation (no duplicate applications)
   - Status: `SUBMITTED`

2. **Application Management**:
   - Recruiter reviews → Status updates (`UNDER_REVIEW`, `SHORTLISTED`)
   - Recruiter assignment → `assignRecruiter()`

3. **Interview Process**:
   - `InterviewController.scheduleInterview()` → Interview creation
   - Status tracking: `SCHEDULED` → `COMPLETED`
   - Feedback and ratings collection

### 4. **User Profile Management**

```
User Registration → Profile Creation → Skill Addition → Application History
```

**Components:**
- **User Entity**: Basic authentication info
- **ApplicantProfile**: Extended candidate information
- **ApplicantSkill**: Skill proficiency tracking
- **SavedJob**: Job bookmarking functionality

### 5. **Data Flow Architecture**

```
Controller Layer → Service Layer → Repository Layer → Database
```

**Key Patterns:**
- **DTOs**: Request/Response separation (`RequestDto`, `ResponseDto`)
- **Model Mapping**: `ModelMapper` for entity-DTO conversion
- **Pagination**: `PageResponse` wrapper for large datasets
- **Auditing**: `AuditableEntity` for tracking creation/updates

### 6. **Security Implementation**

```
JWT Filter → Role Validation → Method-Level Security → Resource Access
```
**Security Features:**
- JWT-based stateless authentication
- Role-based access control (`@PreAuthorize`)
- CORS configuration for frontend integration
- Password encryption with BCrypt

### 7. **API Response Structure**

```json
{
  "success": true/false,
  "message": "Operation result",
  "data": {...},
  "errors": [...],
  "timestamp": "2024-01-01T00:00:00"
}
```

### 8. **Database Relationships**

```
User ←→ Roles (Many-to-Many)
User → ApplicantProfile (One-to-One)
Job ← JobApplication → ApplicantProfile
JobApplication → Interview (One-to-Many)
Job ←→ Skills (Many-to-Many via JobSkill)
ApplicantProfile ←→ Skills (Many-to-Many via ApplicantSkill)
```

### 9. **Error Handling Flow**

```
Exception Thrown → GlobalExceptionHandler → Standardized Error Response
```

**Exception Types:**
- `ResourceNotFoundException`: 404 responses
- `DuplicateResourceException`: Conflict handling
- `BusinessException`: Business logic violations
- Validation errors: Field-level validation responses

### 10. **Typical User Journeys**

**Candidate Journey:**
1. Register → Create profile → Add skills → Search jobs → Apply → Interview → Decision

**Recruiter Journey:**
1. Login → Create job → Add requirements → Review applications → Schedule interviews → Make decisions

**Admin Journey:**
1. Login → Manage users → Oversee all operations → System configuration

This architecture ensures scalability, maintainability, and clear separation of concerns while providing comprehensive recruitment management functionality.