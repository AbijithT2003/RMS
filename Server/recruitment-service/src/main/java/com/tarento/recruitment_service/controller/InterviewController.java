package com.tarento.recruitment_service.controller;

import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;       
import com.tarento.recruitment_service.service.*;   
import com.tarento.recruitment_service.config.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@Validated
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
@Tag(name = "Interviews", description = "Interview scheduling and management APIs")
public class InterviewController {
    private final InterviewService interviewService;
    
    @PostMapping
    @Operation(summary = "Schedule interview", description = "Schedules a new interview")
    public ResponseEntity<ApiResponse<InterviewResponse>> scheduleInterview(
            @Valid @RequestBody CreateInterviewRequest request) {
        InterviewResponse response = interviewService.scheduleInterview(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Interview scheduled successfully", response));
    }
    
    @PatchMapping("/{id}")
    @Operation(summary = "Update interview", description = "Updates interview details and feedback")
    public ResponseEntity<ApiResponse<InterviewResponse>> updateInterview(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateInterviewRequest request) {
        InterviewResponse response = interviewService.updateInterview(id, request);
        return ResponseEntity.ok(ApiResponse.success("Interview updated successfully", response));
    }
    
    @GetMapping("/application/{applicationId}")
    @Operation(summary = "Get interviews by application", description = "Retrieves all interviews for an application")
    public ResponseEntity<ApiResponse<List<InterviewResponse>>> getInterviewsByApplication(
            @PathVariable UUID applicationId) {
        List<InterviewResponse> response = interviewService.getInterviewsByApplication(applicationId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/interviewer/{interviewerId}")
    @Operation(summary = "Get interviews by interviewer", description = "Retrieves all interviews for an interviewer")
    public ResponseEntity<ApiResponse<List<InterviewResponse>>> getInterviewsByInterviewer(
            @PathVariable UUID interviewerId) {
        List<InterviewResponse> response = interviewService.getInterviewsByInterviewer(interviewerId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}