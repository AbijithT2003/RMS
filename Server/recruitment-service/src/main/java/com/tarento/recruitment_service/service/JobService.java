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


@Service
@RequiredArgsConstructor
@Transactional
public class JobService {
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    
    public JobResponse createJob(UUID createdById, CreateJobRequest request) {
    User createdBy = userRepository.findById(createdById)
        .orElseThrow(() -> new RuntimeException("User not found"));
        
        Job job = modelMapper.map(request, Job.class);
    // store creator id as UUID (AuditableEntity.createdBy is now UUID)
    job.setCreatedBy(createdBy.getId());
        
        Job saved = jobRepository.save(job);
        return mapToJobResponse(saved);
    }

    public PageResponse<JobResponse> getAllJobs(Pageable pageable) {
        Page<Job> jobs = jobRepository.findAll(pageable);
        Page<JobResponse> responsePage = jobs.map(this::mapToJobResponse);
        return PageResponse.of(responsePage);
    }
    
    public JobResponse getJobById(UUID id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
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
    
    public JobResponse updateJob(UUID id, CreateJobRequest request) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        
        modelMapper.map(request, job);
        Job updated = jobRepository.save(job);
        return mapToJobResponse(updated);
    }
    
    public void deleteJob(UUID id) {
        if (!jobRepository.existsById(id)) {
            throw new RuntimeException("Job not found with id: " + id);
        }
        jobRepository.deleteById(id);
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
