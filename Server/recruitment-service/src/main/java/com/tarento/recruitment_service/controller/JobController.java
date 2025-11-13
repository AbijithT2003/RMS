package com.tarento.recruitment_service.controller;


import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.service.*;   
import com.tarento.recruitment_service.config.*; 
import com.tarento.recruitment_service.model.enums.*;
import com.tarento.recruitment_service.model.User;   

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
@Tag(name = "Jobs", description = "Job posting management APIs")
public class JobController {
    private final JobService jobService;
    private final JwtService jwtService;
    private final UserService userService;
    
    @PostMapping
@PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
@Operation(summary = "Create a new job posting", description = "Allows an Admin or Recruiter to create a new job posting")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Job created successfully",
        content = @Content(schema = @Schema(implementation = JobResponse.class))),
    @ApiResponse(responseCode = "400", description = "Invalid input data",
        content = @Content(schema = @Schema(implementation = ApiResponse.class))),
    @ApiResponse(responseCode = "401", description = "Unauthorized",
        content = @Content(schema = @Schema(implementation = ApiResponse.class))),
    @ApiResponse(responseCode = "403", description = "Forbidden - insufficient permissions",
        content = @Content(schema = @Schema(implementation = ApiResponse.class)))
})
public ResponseEntity<Apiresponse<JobResponse>> createJob(
        @RequestBody(description = "Job creation details", required = true,
            content = @Content(schema = @Schema(implementation = CreateJobRequest.class)))
        @org.springframework.web.bind.annotation.RequestBody CreateJobRequest request,
        @RequestHeader("Authorization") String authHeader
) {
    try {
        String token = authHeader.replace("Bearer ", "").trim();
        String email = jwtService.extractUsername(token);
        UserResponse userResponse = userService.getUserByEmail(email);

        JobResponse jobResponse = jobService.createJob(userResponse.getId(), request);

        return ResponseEntity.ok(
                Apiresponse.<JobResponse>builder()
                        .success(true)
                        .message("Job created successfully")
                        .data(jobResponse)
                        .build()
        );
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Apiresponse.<JobResponse>builder()
                        .success(false)
                        .message("Failed to create job: " + e.getMessage())
                        .build());
    }
}

    
    @GetMapping("/{id}")
    @Operation(summary = "Get job by ID", description = "Retrieves a job posting by its unique identifier")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Job found",
            content = @Content(schema = @Schema(implementation = JobResponse.class))),
        @ApiResponse(responseCode = "404", description = "Job not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<JobResponse>> getJob(@PathVariable UUID id) {
        JobResponse response = jobService.getJobById(id);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search jobs", description = "Search jobs with filters")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Jobs found",
            content = @Content(schema = @Schema(implementation = PageResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid search parameters",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<PageResponse<JobResponse>>> searchJobs(
            @Parameter(description = "Job status") @RequestParam(required = false) JobStatus status,
            @Parameter(description = "Job type") @RequestParam(required = false) JobType jobType,
            @Parameter(description = "Work mode") @RequestParam(required = false) WorkMode workMode,
            @Parameter(description = "Location city") @RequestParam(required = false) String locationCity,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<JobResponse> response = jobService.searchJobs(
                status != null ? status : JobStatus.ACTIVE,
                jobType, workMode, locationCity, pageable);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping("/search/keyword")
    @Operation(summary = "Search jobs by keyword", description = "Search jobs by keyword in title or description")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Jobs found",
            content = @Content(schema = @Schema(implementation = PageResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid keyword",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<PageResponse<JobResponse>>> searchByKeyword(
            @Parameter(description = "Search keyword") @RequestParam String keyword,
            @Parameter(description = "Job status") @RequestParam(required = false) JobStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<JobResponse> response = jobService.searchByKeyword(
                keyword, status != null ? status : JobStatus.ACTIVE, pageable);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    @Operation(summary = "Update job", description = "Updates an existing job posting")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Job updated successfully",
            content = @Content(schema = @Schema(implementation = JobResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @ApiResponse(responseCode = "404", description = "Job not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @ApiResponse(responseCode = "403", description = "Forbidden",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<JobResponse>> updateJob(
            @PathVariable UUID id,
            @RequestBody(description = "Job update details", required = true,
                content = @Content(schema = @Schema(implementation = CreateJobRequest.class)))
            @Valid @org.springframework.web.bind.annotation.RequestBody CreateJobRequest request) {
        JobResponse response = jobService.updateJob(id, request);
        return ResponseEntity.ok(Apiresponse.success("Job updated successfully", response));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete job", description = "Deletes a job posting")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Job deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Job not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @ApiResponse(responseCode = "403", description = "Forbidden",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<Void>> deleteJob(@PathVariable UUID id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok(Apiresponse.success("Job deleted successfully", null));
    }
    
    @GetMapping
    @Operation(summary = "Get all jobs", description = "Retrieves all job postings with pagination")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Jobs retrieved successfully",
            content = @Content(schema = @Schema(implementation = PageResponse.class)))
    })
    public ResponseEntity<Apiresponse<PageResponse<JobResponse>>> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<JobResponse> response = jobService.getAllJobs(pageable);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
}
