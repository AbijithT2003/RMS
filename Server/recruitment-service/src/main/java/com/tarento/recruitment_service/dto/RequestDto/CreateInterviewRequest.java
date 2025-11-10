package com.tarento.recruitment_service.dto.RequestDto;

import com.tarento.recruitment_service.model.enums.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Data; 

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateInterviewRequest {
    @NotNull(message = "Application ID is required")
    private UUID applicationId;
    
    @NotNull(message = "Interviewer ID is required")
    private UUID interviewerId;
    
    @NotNull(message = "Interview round is required")
    @Min(value = 1, message = "Interview round must be at least 1")
    private Integer interviewRound;
    
    @NotNull(message = "Interview type is required")
    private InterviewType interviewType;
    
    @NotNull(message = "Scheduled date is required")
    @Future(message = "Scheduled date must be in the future")
    private LocalDateTime scheduledDate;
    
    @Min(value = 15, message = "Duration must be at least 15 minutes")
    @Max(value = 480, message = "Duration must not exceed 480 minutes")
    private Integer durationMinutes;
    
    private String meetingLink;
    private String location;
}

