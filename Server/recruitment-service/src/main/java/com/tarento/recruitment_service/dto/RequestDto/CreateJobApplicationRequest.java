package com.tarento.recruitment_service.dto.RequestDto;

import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.URL;

import com.tarento.recruitment_service.model.enums.Platform;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Data;
import jakarta.persistence.EnumType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateJobApplicationRequest {
    @NotNull(message = "Job ID is required")
    private UUID jobId;
    
    @NotNull(message = "Applicant ID is required")
    private UUID applicantId;
    
    @NotBlank(message = "Platform is required")
    @Pattern(regexp = "LINKEDIN|INDEED|GLASSDOOR|COMPANY_SITE|OTHER", 
            message = "Invalid platform value. Must be one of: LINKEDIN, INDEED, GLASSDOOR, COMPANY_SITE, OTHER")
    @Enumerated(EnumType.STRING)
private Platform platform;
    
    private String sourceUrl;
    
    private String resumeVersionUrl;
    
    @Size(max = 5000, message = "Cover letter must not exceed 5000 characters")
    private String coverLetter;
}
