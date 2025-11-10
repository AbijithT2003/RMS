package com.tarento.recruitment_service.dto.RequestDto;

import jakarta.validation.constraints.*;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateJobApplicationRequest {
    @NotNull(message = "Job ID is required")
    private UUID jobId;
    
    @NotNull(message = "Applicant ID is required")
    private UUID applicantId;
    
    private String sourcePlatform;
    private String sourceUrl;
    private String resumeVersionUrl;
    
    @Size(max = 5000, message = "Cover letter must not exceed 5000 characters")
    private String coverLetter;
}
