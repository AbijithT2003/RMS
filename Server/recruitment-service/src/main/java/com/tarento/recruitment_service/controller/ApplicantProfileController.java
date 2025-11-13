package com.tarento.recruitment_service.controller;

import com.tarento.recruitment_service.config.ApiResponse;
import com.tarento.recruitment_service.dto.ResponseDto.ApplicantProfileResponse;
import com.tarento.recruitment_service.service.ApplicantProfileService;
import com.tarento.recruitment_service.config.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
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
   
    public ResponseEntity<ApiResponse<ApplicantProfileResponse>> getApplicant(@PathVariable UUID id) {
        ApplicantProfileResponse response = applicantProfileService.getApplicantById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping
    @Operation(summary = "Get all applicants", description = "Retrieves all applicant profiles with pagination")
    public ResponseEntity<ApiResponse<PageResponse<ApplicantProfileResponse>>> getAllApplicants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<ApplicantProfileResponse> response = applicantProfileService.getAllApplicants(pageable);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}