package com.tarento.recruitment_service.dto.ResponseDto;

import com.tarento.recruitment_service.model.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor; 
import java.time.LocalDateTime;
import java.util.UUID;   

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewResponse {
    private UUID id;
    private UUID applicationId;
    private UUID interviewerId;
    private String interviewerName;
    private Integer interviewRound;
    private InterviewType interviewType;
    private LocalDateTime scheduledDate;
    private Integer durationMinutes;
    private String meetingLink;
    private String location;
    private InterviewStatus status;
    private InterviewResult result;
    private String feedback;
    private Integer rating;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}