package com.tarento.recruitment_service.controller;

import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;       
import com.tarento.recruitment_service.service.*;   
import com.tarento.recruitment_service.config.*;
import io.swagger.v3.oas.annotations.Operation;
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
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Interview scheduled successfully",
            content = @Content(schema = @Schema(implementation = InterviewResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @ApiResponse(responseCode = "404", description = "Application or interviewer not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<InterviewResponse>> scheduleInterview(
            @RequestBody(description = "Interview scheduling details", required = true,
                content = @Content(schema = @Schema(implementation = CreateInterviewRequest.class)))
            @Valid @org.springframework.web.bind.annotation.RequestBody CreateInterviewRequest request) {
        InterviewResponse response = interviewService.scheduleInterview(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Apiresponse.success("Interview scheduled successfully", response));
    }
    
    @PatchMapping("/{id}")
    @Operation(summary = "Update interview", description = "Updates interview details and feedback")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Interview updated successfully",
            content = @Content(schema = @Schema(implementation = InterviewResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @ApiResponse(responseCode = "404", description = "Interview not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<InterviewResponse>> updateInterview(
            @PathVariable UUID id,
            @RequestBody(description = "Interview update details", required = true,
                content = @Content(schema = @Schema(implementation = UpdateInterviewRequest.class)))
            @Valid @org.springframework.web.bind.annotation.RequestBody UpdateInterviewRequest request) {
        InterviewResponse response = interviewService.updateInterview(id, request);
        return ResponseEntity.ok(Apiresponse.success("Interview updated successfully", response));
    }
    
    @GetMapping("/application/{applicationId}")
    @Operation(summary = "Get interviews by application", description = "Retrieves all interviews for an application")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Interviews found",
            content = @Content(schema = @Schema(implementation = List.class))),
        @ApiResponse(responseCode = "404", description = "Application not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<List<InterviewResponse>>> getInterviewsByApplication(
            @PathVariable UUID applicationId) {
        List<InterviewResponse> response = interviewService.getInterviewsByApplication(applicationId);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping("/interviewer/{interviewerId}")
    @Operation(summary = "Get interviews by interviewer", description = "Retrieves all interviews for an interviewer")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Interviews found",
            content = @Content(schema = @Schema(implementation = List.class))),
        @ApiResponse(responseCode = "404", description = "Interviewer not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<List<InterviewResponse>>> getInterviewsByInterviewer(
            @PathVariable UUID interviewerId) {
        List<InterviewResponse> response = interviewService.getInterviewsByInterviewer(interviewerId);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping
    @Operation(summary = "Get all interviews", description = "Retrieves all interviews in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Interviews retrieved successfully",
            content = @Content(schema = @Schema(implementation = List.class)))
    })
    public ResponseEntity<Apiresponse<List<InterviewResponse>>> getAllInterviews() {
        List<InterviewResponse> response = interviewService.getAllInterviews();
        return ResponseEntity.ok(Apiresponse.success(response));
    }
}