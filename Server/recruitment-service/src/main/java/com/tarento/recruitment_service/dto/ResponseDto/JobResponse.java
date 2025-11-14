package com.tarento.recruitment_service.dto.ResponseDto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;      
import com.tarento.recruitment_service.model.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;      
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobResponse {
    private UUID id;
    private UUID createdById;
    private String createdByName;
    private String title;
    private String department;
    private String sector;
    private String description;
    private String requirements;
    private JobType jobType;
    private WorkMode workMode;
    private String locationCity;
    private String locationState;
    private String locationCountry;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private Integer experienceRequired;
    private JobStatus status;
    private LocalDateTime applicationDeadline;
    private Integer positionsAvailable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
