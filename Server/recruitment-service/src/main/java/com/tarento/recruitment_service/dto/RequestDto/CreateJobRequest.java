package com.tarento.recruitment_service.dto.RequestDto;

import com.tarento.recruitment_service.model.enums.*;
import lombok.Data;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateJobRequest {
    @NotNull(message = "Organization ID is required")
    private UUID organizationId;
    
    @NotBlank(message = "Job title is required")
    private String title;
    
    private String department;
    private String sector;
    
    @NotBlank(message = "Job description is required")
    private String description;
    
    private String requirements;
    
    @NotNull(message = "Job type is required")
    private JobType jobType;
    
    @NotNull(message = "Work mode is required")
    private WorkMode workMode;
    
    private String locationCity;
    private String locationState;
    private String locationCountry;
    
    @DecimalMin(value = "0.0", message = "Minimum salary must be positive")
    private BigDecimal salaryMin;
    
    @DecimalMin(value = "0.0", message = "Maximum salary must be positive")
    private BigDecimal salaryMax;
    
    @Min(value = 0, message = "Experience required must be non-negative")
    private Integer experienceRequired;
    
    @NotNull(message = "Status is required")
    private JobStatus status;
    
    private LocalDateTime applicationDeadline;
    
    @Min(value = 1, message = "At least one position must be available")
    private Integer positionsAvailable;
}
