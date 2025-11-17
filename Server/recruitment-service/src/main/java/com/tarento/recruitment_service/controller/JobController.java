package com.tarento.recruitment_service.controller;


import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.service.*;   
import com.tarento.recruitment_service.config.*; 
import com.tarento.recruitment_service.model.enums.*;
import com.tarento.recruitment_service.model.User;   

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;


@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@Validated
@Tag(name = "Jobs", description = "Job posting management APIs")
public class JobController {
    private final JobService jobService;
    private final JwtService jwtService;
    private final UserService userService;
    

    @GetMapping
    @Operation(summary = "Get all jobs", description = "Retrieves all job postings with pagination")
    public ResponseEntity<ApiResponse<PageResponse<JobResponse>>> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<JobResponse> response = jobService.getAllJobs(pageable);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    
    @PostMapping
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    @Operation(summary = "Create a new job posting", description = "Allows an Admin or Recruiter to create a new job posting")
    public ResponseEntity<ApiResponse<JobResponse>> createJob(
            @Valid @RequestBody CreateJobRequest request,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "").trim();
        String email = jwtService.extractUsername(token);
        UserResponse userResponse = userService.getUserByValue(email);

        JobResponse jobResponse = jobService.createJob(userResponse.getId(), request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Job created successfully", jobResponse));
    }

    
    
    
    
    @GetMapping("/search")
    @Operation(summary = "Search jobs", description = "Search jobs with filters")
    public ResponseEntity<ApiResponse<PageResponse<JobResponse>>> searchJobs(
            @Parameter(description = "Job status (default: ACTIVE)") @RequestParam(required = false) JobStatus status,
            @Parameter(description = "Search keyword") @RequestParam(required = false) String keyword,
            @Parameter(description = "Job type") @RequestParam(required = false) JobType jobType,
            @Parameter(description = "Work mode") @RequestParam(required = false) WorkMode workMode,
            @Parameter(description = "Location city") @RequestParam(required = false) String locationCity,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        // Default to ACTIVE status if not provided
        JobStatus searchStatus = status != null ? status : JobStatus.ACTIVE;
        
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<JobResponse> response = jobService.searchJobs(
                searchStatus, keyword, jobType, workMode, locationCity, pageable);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    @Operation(summary = "Update job", description = "Updates an existing job posting")
    public ResponseEntity<ApiResponse<JobResponse>> updateJob(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateJobRequest request) {
        JobResponse response = jobService.updateJob(id, request);
        return ResponseEntity.ok(ApiResponse.success("Job updated successfully", response));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DeletedJobResponse>> deleteJob(@PathVariable UUID id) {

        DeletedJobResponse deleted = jobService.deleteJob(id);

        return ResponseEntity.ok(
                ApiResponse.success("Job deleted successfully", deleted)
        );
    }   
    
}
            