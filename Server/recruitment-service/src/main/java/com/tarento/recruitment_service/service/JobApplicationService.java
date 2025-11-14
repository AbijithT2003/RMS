package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.model.*;
import com.tarento.recruitment_service.model.enums.*;
import com.tarento.recruitment_service.repository.*;
import com.tarento.recruitment_service.config.*;
import com.tarento.recruitment_service.exception.*;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import java.util.Objects;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.Map;
import java.util.Arrays;
import com.tarento.recruitment_service.model.enums.JobStatus;
import com.tarento.recruitment_service.model.enums.ApplicationStatus;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class JobApplicationService {
    private final JobApplicationRepository jobApplicationRepository;
    private final JobRepository jobRepository;
    private final ApplicantProfileRepository applicantProfileRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    
    @NonNull
    public JobApplicationResponse createApplication(@NonNull CreateJobApplicationRequest request) {
        Objects.requireNonNull(request.getJobId(), "Job ID must not be null");
        Objects.requireNonNull(request.getApplicantId(), "Applicant ID must not be null");
        
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + request.getJobId()));
        
        ApplicantProfile applicant = applicantProfileRepository.findById(request.getApplicantId())
                .orElseThrow(() -> new ResourceNotFoundException("Applicant profile not found with id: " + request.getApplicantId()));
        
        // Business logic validations
        validateJobApplication(job, request);
        
        if (jobApplicationRepository.existsByJobIdAndApplicantId(request.getJobId(), 
                request.getApplicantId())) {
            throw new DuplicateResourceException("Application already exists for job id: " + request.getJobId());
        }
        
        JobApplication application = JobApplication.builder()
                .job(job)
                .applicant(applicant)
                .platform(Platform.valueOf(request.getPlatform().toUpperCase()))
                .sourceUrl(request.getSourceUrl())
                .status(ApplicationStatus.SUBMITTED)
                .resumeVersionUrl(request.getResumeVersionUrl())
                .coverLetter(request.getCoverLetter())
                .appliedAt(LocalDateTime.now())
                .lastUpdatedAt(LocalDateTime.now())
                .build();
        
        JobApplication saved = jobApplicationRepository.save(application);
        return mapToApplicationResponse(saved);
    }
    
    private void validateJobApplication(Job job, CreateJobApplicationRequest request) {
        // Check if job is still accepting applications
        if (job.getApplicationDeadline() != null && 
            job.getApplicationDeadline().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Application deadline has passed");
        }
        
        // Check if job is active
        if (job.getStatus() != JobStatus.ACTIVE) {
            throw new BusinessException("Job is not accepting applications. Current status: " + job.getStatus());
        }
        
        // Check if positions are still available
        if (job.getPositionsAvailable() != null && job.getPositionsAvailable() > 0) {
            long currentApplications = jobApplicationRepository.countApplicationsByJobId(job.getId());
            if (currentApplications >= job.getPositionsAvailable()) {
                throw new BusinessException("No positions available for this job");
            }
        }
    }
    
    @NonNull
    public JobApplicationResponse getApplicationById(@NonNull UUID id) {
        Objects.requireNonNull(id, "Application ID must not be null");
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        return mapToApplicationResponse(application);
    }
    
    @NonNull
    public PageResponse<JobApplicationResponse> getApplicationsByJob(@NonNull UUID jobId, @NonNull Pageable pageable) {
        Objects.requireNonNull(jobId, "Job ID must not be null");
        Objects.requireNonNull(pageable, "Pageable must not be null");
        
        // Verify job exists
        if (!jobRepository.existsById(jobId)) {
            throw new ResourceNotFoundException("Job not found with id: " + jobId);
        }
        
        Page<JobApplication> applications = jobApplicationRepository.findByJobId(jobId, pageable);
        Page<JobApplicationResponse> responsePage = applications.map(this::mapToApplicationResponse);
        return PageResponse.of(responsePage);
    }
    
    @NonNull
    public PageResponse<JobApplicationResponse> getApplicationsByApplicant(@NonNull UUID applicantId, 
                                                                         @NonNull Pageable pageable) {
        Objects.requireNonNull(applicantId, "Applicant ID must not be null");
        Objects.requireNonNull(pageable, "Pageable must not be null");
        
        // Verify applicant exists
        if (!applicantProfileRepository.existsById(applicantId)) {
            throw new ResourceNotFoundException("Applicant not found with id: " + applicantId);
        }
        
        Page<JobApplication> applications = jobApplicationRepository
                .findByApplicantId(applicantId, pageable);
        Page<JobApplicationResponse> responsePage = applications.map(this::mapToApplicationResponse);
        return PageResponse.of(responsePage);
    }
    
    @NonNull
    public JobApplicationResponse updateApplicationStatus(@NonNull UUID id, @NonNull ApplicationStatus status) {
        Objects.requireNonNull(id, "Application ID must not be null");
        Objects.requireNonNull(status, "Status must not be null");
        
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        
        // Validate status transition
        validateStatusTransition(application.getStatus(), status);
        
        try {
            application.setStatus(status);
            application.setLastUpdatedAt(LocalDateTime.now());
            
            JobApplication updated = jobApplicationRepository.save(application);
            return mapToApplicationResponse(updated);
        } catch (org.springframework.orm.ObjectOptimisticLockingFailureException e) {
            throw new BusinessException("Application was modified by another user. Please refresh and try again.");
        }
    }
    
    private void validateStatusTransition(ApplicationStatus currentStatus, ApplicationStatus newStatus) {
        // Define valid status transitions
        Map<ApplicationStatus, List<ApplicationStatus>> validTransitions = Map.of(
            ApplicationStatus.SUBMITTED, Arrays.asList(ApplicationStatus.UNDER_REVIEW, ApplicationStatus.REJECTED),
            ApplicationStatus.UNDER_REVIEW, Arrays.asList(ApplicationStatus.SHORTLISTED, ApplicationStatus.REJECTED),
            ApplicationStatus.SHORTLISTED, Arrays.asList(ApplicationStatus.INTERVIEW_SCHEDULED, ApplicationStatus.REJECTED),
            ApplicationStatus.INTERVIEW_SCHEDULED, Arrays.asList(ApplicationStatus.INTERVIEWED, ApplicationStatus.REJECTED),
            ApplicationStatus.INTERVIEWED, Arrays.asList(ApplicationStatus.OFFERED, ApplicationStatus.REJECTED),
            ApplicationStatus.OFFERED, Arrays.asList(ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED)
        );
        
        List<ApplicationStatus> allowedStatuses = validTransitions.get(currentStatus);
        if (allowedStatuses == null || !allowedStatuses.contains(newStatus)) {
            throw new BusinessException("Invalid status transition from " + currentStatus + " to " + newStatus);
        }
    }
    
    @NonNull
    public JobApplicationResponse assignRecruiter(@NonNull UUID applicationId, @NonNull UUID recruiterId) {
        Objects.requireNonNull(applicationId, "Application ID must not be null");
        Objects.requireNonNull(recruiterId, "Recruiter ID must not be null");
        
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));
        
        User recruiter = userRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with id: " + recruiterId));
        
        application.setAssignedTo(recruiter);
        application.setLastUpdatedAt(LocalDateTime.now());
        
        JobApplication updated = jobApplicationRepository.save(application);
        return mapToApplicationResponse(updated);
    }
    public PageResponse<JobApplicationResponse> getAllApplications(@NonNull Pageable pageable) {
        Objects.requireNonNull(pageable, "Pageable must not be null");
        Page<JobApplication> applications = jobApplicationRepository.findAll(pageable);
        Page<JobApplicationResponse> responsePage = applications.map(this::mapToApplicationResponse);
        return PageResponse.of(responsePage);
    }  
    
    @NonNull
    private JobApplicationResponse mapToApplicationResponse(@NonNull JobApplication application) {
        Objects.requireNonNull(application, "Application must not be null");
        
        JobApplicationResponse response = modelMapper.map(application, JobApplicationResponse.class);
        Objects.requireNonNull(response, "Failed to map application to response");
        
        if (application.getJob() != null) {
            response.setJobTitle(application.getJob().getTitle());
        }
        if (application.getApplicant() != null && application.getApplicant().getUser() != null) {
            response.setApplicantName(application.getApplicant().getUser().getFullName());
        }
        if (application.getAssignedTo() != null) {
            response.setAssignedToName(application.getAssignedTo().getFullName());
        }
        
        return response;
    }
}