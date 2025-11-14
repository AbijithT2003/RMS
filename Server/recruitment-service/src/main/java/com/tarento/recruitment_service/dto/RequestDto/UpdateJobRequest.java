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
public class UpdateJobRequest {

    @NotBlank(message = "Job title is required")
    @Size(min = 3, max = 100, message = "Job title must be between 3 and 100 characters")
    @Pattern(regexp = "^[\\p{L}\\p{N}\\s\\p{Punct}]*$", message = "Job title contains invalid characters")
    private String title;
    
    @Size(max = 50, message = "Department name must not exceed 50 characters")
    private String department;
    
    @Size(max = 50, message = "Sector name must not exceed 50 characters")
    private String sector;
    
    @NotBlank(message = "Job description is required")
    @Size(min = 50, max = 5000, message = "Job description must be between 50 and 5000 characters")
    private String description;
    
    @Size(max = 2000, message = "Requirements must not exceed 2000 characters")
    private String requirements;
    
    @NotNull(message = "Job type is required")
    private JobType jobType;
    
    @NotNull(message = "Work mode is required")
    private WorkMode workMode;
    
    @Size(max = 100, message = "City name must not exceed 100 characters")
    private String locationCity;
    
    @Size(max = 100, message = "State name must not exceed 100 characters")
    private String locationState;
    
    @Size(max = 100, message = "Country name must not exceed 100 characters")
    private String locationCountry;
    
    @DecimalMin(value = "0.0", message = "Minimum salary must be positive")
    private BigDecimal salaryMin;
    
    @DecimalMax(value = "999999999.99", message = "Maximum salary is too high")
    @DecimalMin(value = "0.0", message = "Maximum salary must be positive")
    private BigDecimal salaryMax;
    
    @Min(value = 0, message = "Experience required must be non-negative")
    private Integer experienceRequired;
    
    @NotNull(message = "Status is required")
    private JobStatus status;
    
    @Future(message = "Application deadline must be in the future")
    private LocalDateTime applicationDeadline;
    
    @Min(value = 1, message = "At least one position must be available")
    private Integer positionsAvailable;
}