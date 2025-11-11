package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.model.*;
import com.tarento.recruitment_service.model.enums.*;
import com.tarento.recruitment_service.repository.*;
import com.tarento.recruitment_service.config.*;
import com.tarento.recruitment_service.exception.*;
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
        
        application.setStatus(status);
        application.setLastUpdatedAt(LocalDateTime.now());
        
        JobApplication updated = jobApplicationRepository.save(application);
        return mapToApplicationResponse(updated);
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
    }    @NonNull
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