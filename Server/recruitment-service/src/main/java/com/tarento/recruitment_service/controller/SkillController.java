package com.tarento.recruitment_service.controller;


import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;       
import com.tarento.recruitment_service.service.*;   
import com.tarento.recruitment_service.config.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@Tag(name = "Skills", description = "Skill management APIs")
public class SkillController {
    private final SkillService skillService;
    
    @PostMapping
    @Operation(summary = "Create skill", description = "Creates a new skill")
    public ResponseEntity<ApiResponse<SkillResponse>> createSkill(
            @Valid @RequestBody CreateSkillRequest request) {
        SkillResponse response = skillService.createSkill(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Skill created successfully", response));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get skill by ID", description = "Retrieves a skill by its unique identifier")
    public ResponseEntity<ApiResponse<SkillResponse>> getSkill(@PathVariable UUID id) {
        SkillResponse response = skillService.getSkillById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search skills", description = "Search skills by keyword")
    public ResponseEntity<ApiResponse<List<SkillResponse>>> searchSkills(
            @Parameter(description = "Search keyword") @RequestParam String keyword) {
        List<SkillResponse> response = skillService.searchSkills(keyword);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @PostMapping("/applicant")
    @Operation(summary = "Add skill to applicant", description = "Adds a skill to an applicant's profile")
    public ResponseEntity<ApiResponse<ApplicantSkillResponse>> addSkillToApplicant(
            @Valid @RequestBody AddApplicantSkillRequest request) {
        ApplicantSkillResponse response = skillService.addSkillToApplicant(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Skill added to applicant", response));
    }
    
    @PostMapping("/job")
    @Operation(summary = "Add skill to job", description = "Adds a skill requirement to a job")
    public ResponseEntity<ApiResponse<JobSkillResponse>> addSkillToJob(
            @Valid @RequestBody AddJobSkillRequest request) {
        JobSkillResponse response = skillService.addSkillToJob(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Skill added to job", response));
    }
    
    @GetMapping("/applicant/{applicantId}")
    @Operation(summary = "Get applicant skills", description = "Retrieves all skills for an applicant")
    public ResponseEntity<ApiResponse<List<ApplicantSkillResponse>>> getApplicantSkills(
            @PathVariable UUID applicantId) {
        List<ApplicantSkillResponse> response = skillService.getApplicantSkills(applicantId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/job/{jobId}")
    @Operation(summary = "Get job skills", description = "Retrieves all skill requirements for a job")
    public ResponseEntity<ApiResponse<List<JobSkillResponse>>> getJobSkills(
            @PathVariable UUID jobId) {
        List<JobSkillResponse> response = skillService.getJobSkills(jobId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}