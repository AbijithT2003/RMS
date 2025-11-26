

RMS is a modern recruitment platform that bridges the gap between job seekers and organizations. The system enables job posting, application management, candidate evaluation, interview scheduling, and skills tracking in a unified dashboard.
 
**Documentation:** [View API Docs](http://localhost:8080/swagger-ui.html)

---

## ✨ Key Features

### 👤 For Job Seekers (Applicants)
- **Job Discovery**: Browse active job postings with advanced filters (job type, work mode, location)
- **Easy Applications**: Apply to jobs with resume and cover letter
- **Saved Jobs**: Bookmark interesting positions for later
- **Application Tracking**: Monitor application status in real-time
- **Interview Management**: View scheduled interviews and meeting links
- **Skills Profile**: Build and showcase your professional skills
- **Application Journey**: Visual timeline tracking your progress through each stage

### 💼 For Recruiters
- **Job Management**: Create, edit, and manage job postings
- **Application Review**: Evaluate candidates with detailed profiles
- **Candidate Screening**: Filter applicants by skills, experience, and qualifications
- **Interview Scheduling**: Schedule and manage interviews seamlessly
- **Recruiter Assignment**: Assign applications to team members
- **Pipeline Tracking**: Monitor recruitment progress through visual pipeline stages
- **Job Analytics**: Track key metrics and hiring performance

### 🛡️ For Administrators
- **User Management**: Create and manage user accounts and roles
- **Skills Management**: Maintain a comprehensive skills database
- **System Analytics**: Monitor platform usage and metrics
- **Role Management**: Control permissions and access levels

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 18+ with Vite
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Routing**: React Router v6

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Database**: PostgreSQL
- **ORM**: JPA Hibernate
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Spring Security 6.x
- **API Documentation**: OpenAPI 3.0 (Swagger UI)
- **Build Tool**: Maven

### Infrastructure
- **Frontend Port**: `5173` (Vite dev server)
- **Backend Port**: `8080` (Spring Boot)

---

## 📋 Prerequisites

Ensure you have the following installed:
- **Node.js**: v16 or higher
- **Java**: JDK 17 or higher
- **Maven**: 3.8 or higher
- **PostgreSQL**: 12 or higher (or MySQL 8+)

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/recruitment-management-system.git
cd recruitment-management-system
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd Server/recruitment-service
mvn clean install
```

#### Configure Database

Create a `application.yml` file in `src/main/resources/`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/rms_db
    username: postgres
    password: your_password
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        jdbc:
          batch_size: 20
        order_inserts: true
        order_updates: true

application:
  jwt:
    secret: your-base64-encoded-secret-key-min-64-bytes
    expiration: 86400000  # 24 hours in ms
    refreshExpiration: 604800000  # 7 days in ms

server:
  port: 8080
  servlet:
    context-path: /
```

#### Run Backend
```bash
mvn spring-boot:run
```

Backend will start at: `http://localhost:8080`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd Client/Recruitment_Management_System
npm install
```

#### Configure API Client

Update `src/api/client.js`:
```javascript
export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

#### Run Frontend
```bash
npm run dev
```

Frontend will start at: `http://localhost:5173`

---

## 📦 Project Structure

```
recruitment-management-system/
├── Client/                          # Frontend React application
│   └── Recruitment_Management_System/
│       ├── src/
│       │   ├── api/                # API client & endpoints
│       │   ├── components/         # Reusable UI components
│       │   ├── pages/              # Page components
│       │   ├── hooks/              # Custom React hooks
│       │   ├── routes/             # Route definitions
│       │   ├── app/                # Main app layouts
│       │   └── styles/             # Global styles
│       ├── package.json
│       └── vite.config.js
│
└── Server/                          # Backend Spring application
    └── recruitment-service/
        ├── src/main/java/
        │   └── com/tarento/recruitment_service/
        │       ├── controller/      # REST API endpoints
        │       ├── service/         # Business logic
        │       ├── repository/      # Data access layer
        │       ├── model/           # Entity classes
        │       ├── dto/             # Request/Response DTOs
        │       ├── exception/       # Exception handlers
        │       └── config/          # Configuration classes
        ├── src/main/resources/
        │   └── application.yml      # Application config
        ├── pom.xml
        └── Dockerfile
```

---

## 🔐 Authentication & Authorization

### JWT Implementation
- **Login**: Send email & password to `/api/auth/login`
- **Response**: Receive JWT token with user roles
- **Request**: Include token in `Authorization: Bearer <token>` header

### Role-Based Access Control
```
CANDIDATE   → Browse jobs, apply, manage applications
RECRUITER   → Post jobs, review applications, schedule interviews
ADMIN       → Manage users, skills, and system settings
```

---

## 📚 API Documentation

Access interactive API documentation at:
```
http://localhost:8080/swagger-ui.html
```

### Key API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

#### Jobs
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/{id}` - Get job details
- `POST /api/jobs` - Create job (Recruiter)
- `PUT /api/jobs/{id}` - Update job (Recruiter)
- `DELETE /api/jobs/{id}` - Delete job (Recruiter)
- `GET /api/jobs/search` - Search jobs with filters

#### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get all applications
- `GET /api/applications/{id}` - Get application details
- `PATCH /api/applications/{id}/status` - Update application status
- `PATCH /api/applications/{id}/assign` - Assign recruiter

#### Interviews
- `POST /api/interviews` - Schedule interview
- `GET /api/interviews/application/{applicationId}` - Get interview details
- `PATCH /api/interviews/{id}` - Update interview

#### Skills
- `GET /api/skills` - List all skills
- `POST /api/skills` - Create skill (Admin)
- `POST /api/skills/applicant` - Add skill to applicant
- `GET /api/skills/applicant/{applicantId}` - Get applicant skills

---

## 🔄 Data Flow

```
User Registration
├─ Applicant → Creates ApplicantProfile
├─ Recruiter → Assigned to OrganizationTeam
└─ Admin → Full system access

Job Application
├─ Applicant submits application
├─ Recruiter reviews and updates status
├─ Status changes trigger notifications
└─ Interview scheduled if shortlisted

Interview Management
├─ Recruiter schedules interview
├─ Applicant receives notification
├─ Meeting link and details shared
└─ Feedback recorded post-interview
```

---

## 📊 Database Schema

Key entities:
- **Users**: Authentication & authorization
- **ApplicantProfile**: Candidate information
- **Job**: Job postings
- **JobApplication**: Application tracking
- **Interview**: Interview scheduling
- **Skill**: Skills database
- **ApplicantSkill**: Skills per applicant
- **JobSkill**: Required skills per job

---
## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Last Updated**: November 2025  
**Version**: 1.0.0  
**Status**: Active Development
