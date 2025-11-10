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
    
    @NotNull(message = "Platform is required")
    @Pattern(regexp = "WEBSITE|MOBILE_APP|EXTERNAL|INTERNAL|OTHER", 
            message = "Invalid platform value. Must be one of: WEBSITE, MOBILE_APP, EXTERNAL, INTERNAL, OTHER")
    private String platform;
    
    @URL(message = "Source URL must be a valid URL")
    private String sourceUrl;
    
    @NotNull(message = "Resume URL is required")
    @URL(message = "Resume URL must be a valid URL")
    private String resumeVersionUrl;
    
    @Size(max = 5000, message = "Cover letter must not exceed 5000 characters")
    @Pattern(regexp = "^[\\p{L}\\p{N}\\s\\p{Punct}]*$", 
            message = "Cover letter contains invalid characters")
    private String coverLetter;
}
