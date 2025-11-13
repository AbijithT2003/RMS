package com.tarento.recruitment_service.controller;

import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;       
import com.tarento.recruitment_service.service.*;   
import com.tarento.recruitment_service.config.*;
import com.tarento.recruitment_service.model.enums.*;

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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@Validated
@Tag(name = "Job Applications", description = "Job application management APIs")
public class JobApplicationController {
    private final JobApplicationService jobApplicationService;
    
    @PostMapping
    @Operation(summary = "Submit job application", description = "Submit a new job application")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Application submitted successfully",
            content = @Content(schema = @Schema(implementation = JobApplicationResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input or duplicate application",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @ApiResponse(responseCode = "404", description = "Job or applicant not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<JobApplicationResponse>> createApplication(
            @RequestBody(description = "Job application details", required = true,
                content = @Content(schema = @Schema(implementation = CreateJobApplicationRequest.class)))
            @Valid @org.springframework.web.bind.annotation.RequestBody CreateJobApplicationRequest request) {
        JobApplicationResponse response = jobApplicationService.createApplication(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Apiresponse.success("Application submitted successfully", response));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get application by ID", description = "Retrieves an application by its unique identifier")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Application found",
            content = @Content(schema = @Schema(implementation = JobApplicationResponse.class))),
        @ApiResponse(responseCode = "404", description = "Application not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<JobApplicationResponse>> getApplication(@PathVariable UUID id) {
        JobApplicationResponse response = jobApplicationService.getApplicationById(id);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping("/job/{jobId}")
    @Operation(summary = "Get applications by job", description = "Retrieves all applications for a specific job")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Applications found",
            content = @Content(schema = @Schema(implementation = PageResponse.class))),
        @ApiResponse(responseCode = "404", description = "Job not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<PageResponse<JobApplicationResponse>>> getApplicationsByJob(
            @PathVariable UUID jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<JobApplicationResponse> response = 
                jobApplicationService.getApplicationsByJob(jobId, pageable);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping("/applicant/{applicantId}")
    @Operation(summary = "Get applications by applicant", description = "Retrieves all applications by an applicant")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Applications found",
            content = @Content(schema = @Schema(implementation = PageResponse.class))),
        @ApiResponse(responseCode = "404", description = "Applicant not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<PageResponse<JobApplicationResponse>>> getApplicationsByApplicant(
            @PathVariable UUID applicantId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<JobApplicationResponse> response = 
                jobApplicationService.getApplicationsByApplicant(applicantId, pageable);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Update application status", description = "Updates the status of an application")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Status updated successfully",
            content = @Content(schema = @Schema(implementation = JobApplicationResponse.class))),
        @ApiResponse(responseCode = "404", description = "Application not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid status",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<JobApplicationResponse>> updateStatus(
            @PathVariable UUID id,
            @Parameter(description = "New application status") @RequestParam ApplicationStatus status) {
        JobApplicationResponse response = jobApplicationService.updateApplicationStatus(id, status);
        return ResponseEntity.ok(Apiresponse.success("Application status updated", response));
    }
    
    @PatchMapping("/{id}/assign")
    @Operation(summary = "Assign recruiter", description = "Assigns a recruiter to an application")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Recruiter assigned successfully",
            content = @Content(schema = @Schema(implementation = JobApplicationResponse.class))),
        @ApiResponse(responseCode = "404", description = "Application or recruiter not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<JobApplicationResponse>> assignRecruiter(
            @PathVariable UUID id,
            @Parameter(description = "Recruiter user ID") @RequestParam UUID recruiterId) {
        JobApplicationResponse response = jobApplicationService.assignRecruiter(id, recruiterId);
        return ResponseEntity.ok(Apiresponse.success("Recruiter assigned successfully", response));
    }
    
    @GetMapping
    @Operation(summary = "Get all applications", description = "Retrieves all job applications with pagination")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Applications retrieved successfully",
            content = @Content(schema = @Schema(implementation = PageResponse.class)))
    })
    public ResponseEntity<Apiresponse<PageResponse<JobApplicationResponse>>> getAllApplications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<JobApplicationResponse> response = jobApplicationService.getAllApplications(pageable);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
}