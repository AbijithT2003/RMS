package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.model.*;
import com.tarento.recruitment_service.model.enums.*;
import com.tarento.recruitment_service.repository.*;
import com.tarento.recruitment_service.config.*;
import lombok.RequiredArgsConstructor;
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
    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    
    public JobApplicationResponse createApplication(CreateJobApplicationRequest request) {
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));
        
        ApplicantProfile applicant = applicantProfileRepository.findById(request.getApplicantId())
                .orElseThrow(() -> new RuntimeException("Applicant profile not found"));
        
        if (jobApplicationRepository.existsByJobIdAndApplicantId(request.getJobId(), 
                request.getApplicantId())) {
            throw new RuntimeException("Application already exists for this job");
        }
        
        JobApplication application = JobApplication.builder()
                .job(job)
                .applicant(applicant)
                .organization(job.getOrganization())
                .Platform(request.getSourcePlatform())
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
    
    public JobApplicationResponse getApplicationById(UUID id) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
        return mapToApplicationResponse(application);
    }
    
    public PageResponse<JobApplicationResponse> getApplicationsByJob(UUID jobId, Pageable pageable) {
        Page<JobApplication> applications = jobApplicationRepository.findByJobId(jobId, pageable);
        Page<JobApplicationResponse> responsePage = applications.map(this::mapToApplicationResponse);
        return PageResponse.of(responsePage);
    }
    
    public PageResponse<JobApplicationResponse> getApplicationsByApplicant(UUID applicantId, 
                                                                            Pageable pageable) {
        Page<JobApplication> applications = jobApplicationRepository
                .findByApplicantId(applicantId, pageable);
        Page<JobApplicationResponse> responsePage = applications.map(this::mapToApplicationResponse);
        return PageResponse.of(responsePage);
    }
    
    public JobApplicationResponse updateApplicationStatus(UUID id, ApplicationStatus status) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        application.setStatus(status);
        application.setLastUpdatedAt(LocalDateTime.now());
        
        JobApplication updated = jobApplicationRepository.save(application);
        return mapToApplicationResponse(updated);
    }
    
    public JobApplicationResponse assignRecruiter(UUID applicationId, UUID recruiterId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
    User recruiter = userRepository.findById(recruiterId)
        .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        
        application.setAssignedTo(recruiter);
        application.setLastUpdatedAt(LocalDateTime.now());
        
        JobApplication updated = jobApplicationRepository.save(application);
        return mapToApplicationResponse(updated);
    }
    
    private JobApplicationResponse mapToApplicationResponse(JobApplication application) {
        JobApplicationResponse response = modelMapper.map(application, JobApplicationResponse.class);
        if (application.getJob() != null) {
            response.setJobTitle(application.getJob().getTitle());
        }
        if (application.getApplicant() != null && application.getApplicant().getUser() != null) {
            response.setApplicantName(application.getApplicant().getUser().getFullName());
        }
        if (application.getOrganization() != null) {
            response.setOrganizationName(application.getOrganization().getName());
        }
        if (application.getAssignedTo() != null) {
            response.setAssignedToName(application.getAssignedTo().getFullName());
        }
        return response;
    }
}