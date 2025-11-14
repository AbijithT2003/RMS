package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.model.*;
import com.tarento.recruitment_service.repository.*;
import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.model.enums.*;
import com.tarento.recruitment_service.config.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;
import java.time.LocalDateTime;
import com.tarento.recruitment_service.exception.BusinessException;
import com.tarento.recruitment_service.exception.ResourceNotFoundException;


@Service
@RequiredArgsConstructor
@Transactional
public class JobService {
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    
    public JobResponse createJob(UUID createdById, CreateJobRequest request) {
        User createdBy = userRepository.findById(createdById)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + createdById));
        
        // Validate business rules
        validateJobCreation(request);
        if (request.getApplicationDeadline() != null &&
            request.getApplicationDeadline().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Application deadline cannot be in the past");
        }
        Job job = modelMapper.map(request, Job.class);
        job.setCreatedBy(createdBy.getId());
        
        Job saved = jobRepository.save(job);
        return mapToJobResponse(saved);
    }
    
    private void validateJobCreation(CreateJobRequest request) {
        // Salary validation
        if (request.getSalaryMin() != null && request.getSalaryMax() != null) {
            if (request.getSalaryMin().compareTo(request.getSalaryMax()) > 0) {
                throw new BusinessException("Minimum salary cannot be greater than maximum salary");
            }
        }
        
        // Application deadline validation
        if (request.getApplicationDeadline() != null && 
            request.getApplicationDeadline().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Application deadline cannot be in the past");
        }
        
        // Experience validation
        if (request.getExperienceRequired() != null && request.getExperienceRequired() < 0) {
            throw new BusinessException("Experience required cannot be negative");
        }
        
        // Positions validation
        if (request.getPositionsAvailable() != null && request.getPositionsAvailable() <= 0) {
            throw new BusinessException("Positions available must be greater than 0");
        }
        
        // Status validation for creation
        if (request.getStatus() == JobStatus.CLOSED || request.getStatus() == JobStatus.CANCELLED) {
            throw new BusinessException("Cannot create job with CLOSED or CANCELLED status");
        }
    }

    public PageResponse<JobResponse> getAllJobs(Pageable pageable) {
        Page<Job> jobs = jobRepository.findAll(pageable);
        Page<JobResponse> responsePage = jobs.map(this::mapToJobResponse);
        return PageResponse.of(responsePage);
    }
    
    public JobResponse getJobById(UUID id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        return mapToJobResponse(job);
    }
    
    public PageResponse<JobResponse> searchJobs(JobStatus status, JobType jobType, 
                                                 WorkMode workMode, String locationCity, 
                                                 Pageable pageable) {
        Page<Job> jobs = jobRepository.searchJobs(status, jobType, workMode, locationCity, pageable);
        Page<JobResponse> responsePage = jobs.map(this::mapToJobResponse);
        return PageResponse.of(responsePage);
    }
    
    public PageResponse<JobResponse> searchByKeyword(String keyword, JobStatus status, Pageable pageable) {
        Page<Job> jobs = jobRepository.searchByKeyword(keyword, status, pageable);
        Page<JobResponse> responsePage = jobs.map(this::mapToJobResponse);
        return PageResponse.of(responsePage);
    }
    
    public JobResponse updateJob(UUID id, UpdateJobRequest request) {
        // Validate path variable matches request body ID
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        
        try {
            modelMapper.map(request, job);
            Job updated = jobRepository.save(job);
            return mapToJobResponse(updated);
        } catch (org.springframework.orm.ObjectOptimisticLockingFailureException e) {
            throw new BusinessException("Job was modified by another user. Please refresh and try again.");
        }
    }
    
    public DeletedJobResponse deleteJob(UUID id) {
    Job job = jobRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

    DeletedJobResponse deletedInfo =
            new DeletedJobResponse(job.getId(), job.getTitle());

    jobRepository.delete(job);

    return deletedInfo;
}

    private JobResponse mapToJobResponse(Job job) {
        JobResponse response = modelMapper.map(job, JobResponse.class);
        if (job.getCreatedBy() != null) {
            // createdBy is a UUID; resolve the user to retrieve the full name
            try {
                userRepository.findById(job.getCreatedBy()).ifPresent(u -> response.setCreatedByName(u.getFullName()));
            } catch (Exception e) {
                // fallback: set raw string if something unexpected is stored
                response.setCreatedByName(job.getCreatedBy().toString());
            }
        }
        return response;
    }
}
