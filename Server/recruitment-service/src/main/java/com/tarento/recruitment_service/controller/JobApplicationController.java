package com.tarento.recruitment_service.controller;

import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;       
import com.tarento.recruitment_service.service.*;   
import com.tarento.recruitment_service.config.*;
import com.tarento.recruitment_service.model.enums.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@Tag(name = "Job Applications", description = "Job application management APIs")
public class JobApplicationController {
    private final JobApplicationService jobApplicationService;
    
    @PostMapping
    @Operation(summary = "Submit job application", description = "Submit a new job application")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> createApplication(
            @Valid @RequestBody CreateJobApplicationRequest request) {
        JobApplicationResponse response = jobApplicationService.createApplication(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Application submitted successfully", response));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get application by ID", description = "Retrieves an application by its unique identifier")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> getApplication(@PathVariable UUID id) {
        JobApplicationResponse response = jobApplicationService.getApplicationById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/job/{jobId}")
    @Operation(summary = "Get applications by job", description = "Retrieves all applications for a specific job")
    public ResponseEntity<ApiResponse<PageResponse<JobApplicationResponse>>> getApplicationsByJob(
            @PathVariable UUID jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<JobApplicationResponse> response = 
                jobApplicationService.getApplicationsByJob(jobId, pageable);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/applicant/{applicantId}")
    @Operation(summary = "Get applications by applicant", description = "Retrieves all applications by an applicant")
    public ResponseEntity<ApiResponse<PageResponse<JobApplicationResponse>>> getApplicationsByApplicant(
            @PathVariable UUID applicantId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<JobApplicationResponse> response = 
                jobApplicationService.getApplicationsByApplicant(applicantId, pageable);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Update application status", description = "Updates the status of an application")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> updateStatus(
            @PathVariable UUID id,
            @Parameter(description = "New application status") @RequestParam ApplicationStatus status) {
        JobApplicationResponse response = jobApplicationService.updateApplicationStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Application status updated", response));
    }
    
    @PatchMapping("/{id}/assign")
    @Operation(summary = "Assign recruiter", description = "Assigns a recruiter to an application")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> assignRecruiter(
            @PathVariable UUID id,
            @Parameter(description = "Recruiter user ID") @RequestParam UUID recruiterId) {
        JobApplicationResponse response = jobApplicationService.assignRecruiter(id, recruiterId);
        return ResponseEntity.ok(ApiResponse.success("Recruiter assigned successfully", response));
    }
}