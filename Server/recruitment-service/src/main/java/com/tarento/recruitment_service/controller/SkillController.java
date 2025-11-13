package com.tarento.recruitment_service.controller;


import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;       
import com.tarento.recruitment_service.service.*;   
import com.tarento.recruitment_service.config.*;

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
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Skill created successfully",
            content = @Content(schema = @Schema(implementation = SkillResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<SkillResponse>> createSkill(
            @RequestBody(description = "Skill creation details", required = true,
                content = @Content(schema = @Schema(implementation = CreateSkillRequest.class)))
            @Valid @org.springframework.web.bind.annotation.RequestBody CreateSkillRequest request) {
        SkillResponse response = skillService.createSkill(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Apiresponse.success("Skill created successfully", response));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get skill by ID", description = "Retrieves a skill by its unique identifier")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Skill found",
            content = @Content(schema = @Schema(implementation = SkillResponse.class))),
        @ApiResponse(responseCode = "404", description = "Skill not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<SkillResponse>> getSkill(@PathVariable UUID id) {
        SkillResponse response = skillService.getSkillById(id);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search skills", description = "Search skills by keyword")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Skills found",
            content = @Content(schema = @Schema(implementation = List.class))),
        @ApiResponse(responseCode = "400", description = "Invalid search keyword",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<List<SkillResponse>>> searchSkills(
            @Parameter(description = "Search keyword") @RequestParam String keyword) {
        List<SkillResponse> response = skillService.searchSkills(keyword);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @PostMapping("/applicant")
    @Operation(summary = "Add skill to applicant", description = "Adds a skill to an applicant's profile")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Skill added to applicant successfully",
            content = @Content(schema = @Schema(implementation = ApplicantSkillResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @ApiResponse(responseCode = "404", description = "Applicant or skill not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<ApplicantSkillResponse>> addSkillToApplicant(
            @RequestBody(description = "Applicant skill details", required = true,
                content = @Content(schema = @Schema(implementation = AddApplicantSkillRequest.class)))
            @Valid @org.springframework.web.bind.annotation.RequestBody AddApplicantSkillRequest request) {
        ApplicantSkillResponse response = skillService.addSkillToApplicant(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Apiresponse.success("Skill added to applicant", response));
    }
    
    @PostMapping("/job")
    @Operation(summary = "Add skill to job", description = "Adds a skill requirement to a job")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Skill added to job successfully",
            content = @Content(schema = @Schema(implementation = JobSkillResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @ApiResponse(responseCode = "404", description = "Job or skill not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<JobSkillResponse>> addSkillToJob(
            @RequestBody(description = "Job skill requirement details", required = true,
                content = @Content(schema = @Schema(implementation = AddJobSkillRequest.class)))
            @Valid @org.springframework.web.bind.annotation.RequestBody AddJobSkillRequest request) {
        JobSkillResponse response = skillService.addSkillToJob(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Apiresponse.success("Skill added to job", response));
    }
    
    @GetMapping("/applicant/{applicantId}")
    @Operation(summary = "Get applicant skills", description = "Retrieves all skills for an applicant")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Skills found",
            content = @Content(schema = @Schema(implementation = List.class))),
        @ApiResponse(responseCode = "404", description = "Applicant not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<List<ApplicantSkillResponse>>> getApplicantSkills(
            @PathVariable UUID applicantId) {
        List<ApplicantSkillResponse> response = skillService.getApplicantSkills(applicantId);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping("/job/{jobId}")
    @Operation(summary = "Get job skills", description = "Retrieves all skill requirements for a job")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Skills found",
            content = @Content(schema = @Schema(implementation = List.class))),
        @ApiResponse(responseCode = "404", description = "Job not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<List<JobSkillResponse>>> getJobSkills(
            @PathVariable UUID jobId) {
        List<JobSkillResponse> response = skillService.getJobSkills(jobId);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping
    @Operation(summary = "Get all skills", description = "Retrieves all skills in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Skills retrieved successfully",
            content = @Content(schema = @Schema(implementation = List.class)))
    })
    public ResponseEntity<Apiresponse<List<SkillResponse>>> getAllSkills() {
        List<SkillResponse> response = skillService.getAllSkills();
        return ResponseEntity.ok(Apiresponse.success(response));
    }
}