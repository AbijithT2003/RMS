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
public class CreateApplicantProfileRequest {
    @NotNull(message = "User ID is required")
    private UUID userId;
    
    private String resumeUrl;
    private String currentTitle;
    
    @Min(value = 0, message = "Experience years must be non-negative")
    private Integer experienceYears;
    
    private String locationCity;
    private String locationState;
    private String locationCountry;
    
    @Size(max = 2000, message = "Bio must not exceed 2000 characters")
    private String bio;
}
