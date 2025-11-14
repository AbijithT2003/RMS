package com.tarento.recruitment_service.controller;

import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.service.SkillService;
import com.tarento.recruitment_service.config.ApiResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@Tag(name = "Skill Management", description = "APIs for managing skills")
public class SkillController {

    private final SkillService skillService;

    // --------------------------------------------------------
    // Create Skill
    // --------------------------------------------------------
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new skill")
    public ResponseEntity<ApiResponse<SkillResponse>> createSkill(
            @RequestBody CreateSkillRequest request) {

        SkillResponse response = skillService.createSkill(request);
        return ResponseEntity.ok(ApiResponse.success("Skill created successfully", response));
    }

    // --------------------------------------------------------
    // Update Skill
    // --------------------------------------------------------
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update existing skill")
    public ResponseEntity<ApiResponse<SkillResponse>> updateSkill(
            @PathVariable UUID id,
            @RequestBody UpdateSkillRequest request) {

        SkillResponse response = skillService.updateSkill(id, request);
        return ResponseEntity.ok(ApiResponse.success("Skill updated successfully", response));
    }

    // --------------------------------------------------------
    // Delete Skill
    // --------------------------------------------------------
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete skill by ID")
    public ResponseEntity<ApiResponse<DeleteSkillResponse>> deleteSkill(@PathVariable UUID id) {

        DeleteSkillResponse response = skillService.deleteSkill(id);
        return ResponseEntity.ok(ApiResponse.success(response.getMessage(), response));
    }

    // --------------------------------------------------------
    // Get All Skills
    // --------------------------------------------------------
    @GetMapping
    @Operation(summary = "Get all skills")
    public ResponseEntity<ApiResponse<List<SkillResponse>>> getAllSkills() {

        List<SkillResponse> list = skillService.getAllSkills();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    // --------------------------------------------------------
    // Search Skill
    // --------------------------------------------------------
    @GetMapping("/search")
    @Operation(summary = "Search skills by keyword")
    public ResponseEntity<ApiResponse<List<SkillResponse>>> searchSkills(
            @RequestParam String keyword) {

        List<SkillResponse> results = skillService.searchSkills(keyword);
        return ResponseEntity.ok(ApiResponse.success(results));
    }

    // --------------------------------------------------------
    // Add Skill to Applicant
    // --------------------------------------------------------
    @PostMapping("/applicant")
    @PreAuthorize("hasRole('APPLICANT') or hasRole('ADMIN')")
    @Operation(summary = "Add a skill to an applicant profile")
    public ResponseEntity<ApiResponse<ApplicantSkillResponse>> addSkillToApplicant(
            @RequestBody AddApplicantSkillRequest request) {

        ApplicantSkillResponse response = skillService.addSkillToApplicant(request);
        return ResponseEntity.ok(ApiResponse.success("Skill added to applicant", response));
    }

    // --------------------------------------------------------
    // Get Applicant's Skills
    // --------------------------------------------------------
    @GetMapping("/applicant/{applicantId}")
    @Operation(summary = "Get all skills of a specific applicant")
    public ResponseEntity<ApiResponse<List<ApplicantSkillResponse>>> getApplicantSkills(
            @PathVariable UUID applicantId) {

        List<ApplicantSkillResponse> list = skillService.getApplicantSkills(applicantId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    // --------------------------------------------------------
    // Add Skill to Job
    // --------------------------------------------------------
    @PostMapping("/job")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    @Operation(summary = "Add a skill to a job posting")
    public ResponseEntity<ApiResponse<JobSkillResponse>> addSkillToJob(
            @RequestBody AddJobSkillRequest request) {

        JobSkillResponse response = skillService.addSkillToJob(request);
        return ResponseEntity.ok(ApiResponse.success("Skill added to job", response));
    }

    // --------------------------------------------------------
    // Get Job's Skills
    // --------------------------------------------------------
    @GetMapping("/job/{jobId}")
    @Operation(summary = "Get all skills linked to a job")
    public ResponseEntity<ApiResponse<List<JobSkillResponse>>> getJobSkills(
            @PathVariable UUID jobId) {

        List<JobSkillResponse> list = skillService.getJobSkills(jobId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
