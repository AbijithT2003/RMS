package com.tarento.recruitment_service.model;

import com.tarento.recruitment_service.model.enums.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.Version;

// Job.java
@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate
@EqualsAndHashCode(callSuper = true)
public class Job extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Version
    private Long version;
    
    @NotBlank(message = "Job title is required")
    @Size(min = 3, max = 100, message = "Job title must be between 3 and 100 characters")
    @Column(nullable = false)
    private String title;
    
    @Size(max = 50, message = "Department name must not exceed 50 characters")
    private String department;
    
    @Size(max = 50, message = "Sector name must not exceed 50 characters")
    private String sector;
    
    @NotBlank(message = "Job description is required")
    @Size(min = 50, max = 5000, message = "Job description must be between 50 and 5000 characters")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    
    @Size(max = 2000, message = "Requirements must not exceed 2000 characters")
    @Column(columnDefinition = "TEXT")
    private String requirements;
    
    @NotNull(message = "Job type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", nullable = false)
    private JobType jobType;
    
    @NotNull(message = "Work mode is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "work_mode", nullable = false)
    private WorkMode workMode;

    @Column(name = "city")
    private String locationCity;

    @Column(name = "state")
    private String locationState;

    @Column(name = "country")
    private String locationCountry;

    @Column(name = "salary_min", precision = 38, scale = 2)
    private BigDecimal salaryMin;

    @Column(name = "salary_max", precision = 38, scale = 2)
    private BigDecimal salaryMax;
    
    @Column(name = "experience_required")
    private Integer experienceRequired;
    
    @Enumerated(EnumType.STRING)
    private JobStatus status;
    
    @Column(name = "application_deadline")
    private LocalDateTime applicationDeadline;
    
    @Column(name = "positions_available")
    private Integer positionsAvailable;
    
}
