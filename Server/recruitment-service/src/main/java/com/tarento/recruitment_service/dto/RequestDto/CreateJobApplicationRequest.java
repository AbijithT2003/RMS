package com.tarento.recruitment_service.dto.RequestDto;

import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.URL;
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
    
    @NotBlank(message = "Platform is required")
    @Pattern(regexp = "LINKEDIN|INDEED|GLASSDOOR|COMPANY_SITE|OTHER", 
            message = "Invalid platform value. Must be one of: LINKEDIN, INDEED, GLASSDOOR, COMPANY_SITE, OTHER")
    private String platform;
    
    private String sourceUrl;
    
    private String resumeVersionUrl;
    
    @Size(max = 5000, message = "Cover letter must not exceed 5000 characters")
    private String coverLetter;
}
