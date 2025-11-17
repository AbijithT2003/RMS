#!/bin/bash

echo "Creating Recruitment Frontend Folder Structure..."

# ---- Base Directories ----
mkdir -p .storybook
mkdir -p public/assets/images
mkdir -p public/assets/fonts
mkdir -p src

# ---- .storybook ----
touch .storybook/{main.js,preview.js,manager.js,theme.js}

# ---- public ----
touch public/index.html
touch public/favicon.ico

# ---- src/api ----
mkdir -p src/api/endpoints
touch src/api/{client.js,interceptors.js}
touch src/api/endpoints/{auth.api.js,jobs.api.js,applications.api.js,interviews.api.js,skills.api.js,users.api.js}

# ---- src/assets ----
mkdir -p src/assets/images/{logos,icons,illustrations}
mkdir -p src/assets/fonts
mkdir -p src/assets/styles
touch src/assets/styles/variables.scss

# ---- src/components (Atomic structure) ----
mkdir -p src/components/{atoms,molecules,organisms,templates}

# Atoms
for comp in Button Input Badge Avatar Icon Label Spinner Tag Tooltip; do
  mkdir -p src/components/atoms/$comp
  touch src/components/atoms/$comp/{$comp.jsx,$comp.module.scss,$comp.stories.jsx,index.js}
done
touch src/components/atoms/index.js

# Molecules
for comp in FormField SearchBar Dropdown DatePicker FileUploader RatingStars SocialLinks TimeSlotPicker SkillTag; do
  mkdir -p src/components/molecules/$comp
  touch src/components/molecules/$comp/{${comp}.jsx,${comp}.module.scss,${comp}.stories.jsx,index.js}
done
touch src/components/molecules/index.js

# Organisms
for comp in Header Sidebar Footer NavigationBar Modal Toast Accordion Tabs Table Pagination EmptyState; do
  mkdir -p src/components/organisms/$comp
  touch src/components/organisms/$comp/{${comp}.jsx,index.js}
done
touch src/components/organisms/index.js

# Templates
for comp in AuthLayout DashboardLayout PublicLayout; do
  mkdir -p src/components/templates/$comp
  touch src/components/templates/$comp/{${comp}.jsx,index.js}
done
touch src/components/templates/index.js

# ---- features ----
mkdir -p src/features

### Authentication Feature
mkdir -p src/features/authentication/{components,hooks,context,utils}
mkdir -p src/features/authentication/components/{LoginForm,RegisterForm,ForgotPasswordForm,ResetPasswordForm,OTPInput,TwoFactorVerification}

touch src/features/authentication/hooks/{useAuth.js,useLogin.js,useRegister.js}
touch src/features/authentication/context/AuthContext.jsx
touch src/features/authentication/utils/{validators.js,tokenManager.js}
touch src/features/authentication/index.js

for comp in LoginForm RegisterForm ForgotPasswordForm ResetPasswordForm OTPInput TwoFactorVerification; do
  touch src/features/authentication/components/$comp/{${comp}.jsx,${comp}.module.scss,${comp}.stories.jsx,${comp}.test.jsx,index.js}
done

### Dashboard Feature
mkdir -p src/features/dashboard/{components/applicant,components/recruiter,hooks}

touch src/features/dashboard/hooks/useDashboardData.js
touch src/features/dashboard/index.js

### Applicant Dashboard Components
for comp in ApplicantDashboard ApplicationsOverview; do
  mkdir -p src/features/dashboard/components/applicant/$comp
  touch src/features/dashboard/components/applicant/$comp/{${comp}.jsx,index.js}
done

### Recruiter Dashboard Components
for comp in RecruiterDashboard JobPostingsOverview; do
  mkdir -p src/features/dashboard/components/recruiter/$comp
  touch src/features/dashboard/components/recruiter/$comp/{${comp}.jsx,index.js}
done

mkdir -p src/features/dashboard/components/{DashboardHeader,DashboardSidebar,UserGreetingCard,StatsOverviewCard,ActivityTimeline,QuickActionsPanel}

for comp in DashboardHeader DashboardSidebar UserGreetingCard StatsOverviewCard ActivityTimeline QuickActionsPanel; do
  touch src/features/dashboard/components/$comp/{${comp}.jsx,index.js}
done

### Jobs Feature
mkdir -p src/features/jobs/{components,hooks,utils}

for comp in JobCard JobList JobFilterPanel JobSearchBar JobCategoryBadge JobTypeTag JobDetailsHeader JobDescriptionSection JobRequirementsList JobSalaryCard JobLocationCard ShareJobButtons JobActions; do
  mkdir -p src/features/jobs/components/$comp
  touch src/features/jobs/components/$comp/{${comp}.jsx,index.js}
done

touch src/features/jobs/hooks/{useJobs.js,useJobFilters.js,useJobSearch.js}
touch src/features/jobs/utils/{jobHelpers.js,filterHelpers.js}
touch src/features/jobs/index.js

### Job Posting (Recruiter Create/Edit Jobs)
mkdir -p src/features/job-posting/{components,hooks}

for comp in CreateJobForm EditJobForm RoleAndResponsibilitiesEditor WYSIWYGDescriptionEditor PositionsAvailableInput ApplicationDeadlinePicker DepartmentDropdown SkillsMultiSelect JobPreviewModal JobPublishingStatusBanner; do
  mkdir -p src/features/job-posting/components/$comp
  touch src/features/job-posting/components/$comp/{${comp}.jsx,index.js}
done

touch src/features/job-posting/hooks/{useCreateJob.js,useEditJob.js}
touch src/features/job-posting/index.js

### Applications Feature
mkdir -p src/features/applications/{components,hooks}

for comp in ApplicantTable ApplicationStatusBadge StageProgressTracker ApplicationDetailsPanel ApplicantNotesSection ResumeVersionHistory ApplicantTimeline; do
  mkdir -p src/features/applications/components/$comp
  touch src/features/applications/components/$comp/{${comp}.jsx,index.js}
done

touch src/features/applications/hooks/{useApplications.js,useApplicationStatus.js}
touch src/features/applications/index.js

### Interviews Feature
mkdir -p src/features/interviews/{components,hooks}

for comp in InterviewScheduler TimeSlotPicker CandidateAvailabilityCalendar InterviewModeSelector InterviewFeedbackForm InterviewReminderCard InterviewScheduleCard; do
  mkdir -p src/features/interviews/components/$comp
  touch src/features/interviews/components/$comp/{${comp}.jsx,index.js}
done

touch src/features/interviews/hooks/useInterviews.js
touch src/features/interviews/index.js

### Profile Feature
mkdir -p src/features/profile/{components/applicant,components/recruiter,hooks}

for comp in ApplicantProfileHeader ProfileAvatar ResumeUploader ResumeViewer ExperienceTimeline EducationCard SkillTags ProfileCompletionProgress PortfolioProjectsList SocialLinksInput; do
  mkdir -p src/features/profile/components/applicant/$comp
  touch src/features/profile/components/applicant/$comp/{${comp}.jsx,index.js}
done

for comp in RecruiterProfileHeader OrganisationInfoCard TeamMemberCard CompanyLogoUploader CompanyBannerComponent; do
  mkdir -p src/features/profile/components/recruiter/$comp
  touch src/features/profile/components/recruiter/$comp/{${comp}.jsx,index.js}
done

touch src/features/profile/hooks/useProfile.js
touch src/features/profile/index.js

### Notifications Feature
mkdir -p src/features/notifications/{components,hooks,context}

for comp in ToastNotification EmailTemplatePreview SMSPreview InAppNotificationCard NotificationSettingsForm; do
  mkdir -p src/features/notifications/components/$comp
  touch src/features/notifications/components/$comp/{${comp}.jsx,index.js}
done

touch src/features/notifications/hooks/useNotifications.js
touch src/features/notifications/context/NotificationContext.jsx
touch src/features/notifications/index.js

### Admin Feature
mkdir -p src/features/admin/{components,hooks}

for comp in UserManagementTable RoleBadge PermissionToggleList SystemSettingsForm AuditLogTable; do
  mkdir -p src/features/admin/components/$comp
  touch src/features/admin/components/$comp/{${comp}.jsx,index.js}
done

touch src/features/admin/hooks/useAdminData.js
touch src/features/admin/index.js

### Skills Feature
mkdir -p src/features/skills/{components,hooks}

for comp in SkillSelector SkillsMultiSelect; do
  mkdir -p src/features/skills/components/$comp
  touch src/features/skills/components/$comp/{${comp}.jsx,index.js}
done

touch src/features/skills/hooks/useSkills.js
touch src/features/skills/index.js

# ---- hooks (global) ----
mkdir -p src/hooks
touch src/hooks/{useDebounce.js,useLocalStorage.js,useWindowSize.js,useOnClickOutside.js,usePagination.js,useInfiniteScroll.js,index.js}

# ---- context (global) ----
mkdir -p src/context
touch src/context/{ThemeContext.jsx,LanguageContext.jsx,index.js}

# ---- pages ----
mkdir -p src/pages/{auth,dashboard,jobs,job-posting,applications,interviews,profile,admin}
touch src/pages/auth/{LoginPage.jsx,RegisterPage.jsx,ForgotPasswordPage.jsx,ResetPasswordPage.jsx}
touch src/pages/dashboard/{ApplicantDashboardPage.jsx,RecruiterDashboardPage.jsx}
touch src/pages/jobs/{JobListPage.jsx,JobDetailsPage.jsx,SavedJobsPage.jsx}
touch src/pages/job-posting/{CreateJobPage.jsx,EditJobPage.jsx,ManageJobsPage.jsx}
touch src/pages/applications/{MyApplicationsPage.jsx,ApplicationDetailsPage.jsx,ManageApplicationsPage.jsx}
touch src/pages/interviews/{InterviewSchedulePage.jsx,MyInterviewsPage.jsx,InterviewDetailsPage.jsx}
touch src/pages/profile/{ApplicantProfilePage.jsx,RecruiterProfilePage.jsx,EditProfilePage.jsx}
touch src/pages/admin/{AdminDashboardPage.jsx,UserManagementPage.jsx,SystemSettingsPage.jsx}
touch src/pages/NotFoundPage.jsx
touch src/pages/index.js

# ---- routes ----
mkdir -p src/routes
touch src/routes/{AppRoutes.jsx,PrivateRoute.jsx,PublicRoute.jsx,RoleBasedRoute.jsx,routeConstants.js}

# ---- store ----
mkdir -p src/store/slices
touch src/store/slices/{authSlice.js,jobsSlice.js,applicationsSlice.js,notificationsSlice.js}
touch src/store/{store.js,index.js}

# ---- utils ----
mkdir -p src/utils/{constants,helpers,validators}
touch src/utils/constants/{apiEndpoints.js,statusEnums.js,validationRules.js}
touch src/utils/helpers/{dateHelpers.js,formatHelpers.js,stringHelpers.js,storageHelpers.js}
touch src/utils/validators/{formValidators.js,fieldValidators.js}
touch src/utils/index.js

# ---- styles ----
mkdir -p src/styles/themes
touch src/styles/{global.scss,variables.scss,mixins.scss,reset.scss}
touch src/styles/themes/{light.scss,dark.scss}

# ---- root files ----
touch src/{App.jsx,App.test.jsx,index.js,setupTests.js}

echo "Folder structure created successfully!"
