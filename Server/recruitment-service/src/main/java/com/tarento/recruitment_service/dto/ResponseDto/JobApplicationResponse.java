package com.tarento.recruitment_service.dto.ResponseDto;

import com.tarento.recruitment_service.model.enums.*;
import lombok.*;    
import java.time.LocalDateTime;
import java.util.UUID;  


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationResponse {
    private UUID id;
    private UUID jobId;
    private String jobTitle;
    private UUID applicantId;
    private String applicantName;

    private String sourcePlatform;
    private String sourceUrl;
    private ApplicationStatus status;
    private String resumeVersionUrl;
    private String coverLetter;
    private UUID assignedToId;
    private String assignedToName;
    private Integer screeningScore;
    private String screeningNotes;
    private LocalDateTime appliedAt;
    private LocalDateTime lastUpdatedAt;
}

