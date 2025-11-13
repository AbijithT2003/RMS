package com.tarento.recruitment_service.controller;

import com.tarento.recruitment_service.config.Apiresponse;
import com.tarento.recruitment_service.dto.ResponseDto.ApplicantProfileResponse;
import com.tarento.recruitment_service.service.ApplicantProfileService;
import com.tarento.recruitment_service.config.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/applicants")
@RequiredArgsConstructor
@Tag(name = "Applicant Profiles", description = "Applicant profile management APIs")
public class ApplicantProfileController {
    private final ApplicantProfileService applicantProfileService;
    
    @GetMapping("/{id}")
    @Operation(summary = "Get applicant by ID", description = "Retrieves an applicant profile by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Applicant found",
            content = @Content(schema = @Schema(implementation = ApplicantProfileResponse.class))),
        @ApiResponse(responseCode = "404", description = "Applicant not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<ApplicantProfileResponse>> getApplicant(@PathVariable UUID id) {
        ApplicantProfileResponse response = applicantProfileService.getApplicantById(id);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping
    @Operation(summary = "Get all applicants", description = "Retrieves all applicant profiles with pagination")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Applicants retrieved successfully",
            content = @Content(schema = @Schema(implementation = PageResponse.class)))
    })
    public ResponseEntity<Apiresponse<PageResponse<ApplicantProfileResponse>>> getAllApplicants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<ApplicantProfileResponse> response = applicantProfileService.getAllApplicants(pageable);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
}