package com.tarento.recruitment_service.model;

import com.tarento.recruitment_service.model.enums.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

// Job.java
@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
    
    @Column(nullable = false)
    private String title;
    
    private String department;
    private String sector;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String requirements;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type")
    private JobType jobType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "work_mode")
    private WorkMode workMode;
    
    @Column(name = "location_city")
    private String locationCity;
    
    @Column(name = "location_state")
    private String locationState;
    
    @Column(name = "location_country")
    private String locationCountry;
    
    @Column(name = "salary_min")
    private BigDecimal salaryMin;
    
    @Column(name = "salary_max")
    private BigDecimal salaryMax;
    
    @Column(name = "experience_required")
    private Integer experienceRequired;
    
    @Enumerated(EnumType.STRING)
    private JobStatus status;
    
    @Column(name = "application_deadline")
    private LocalDateTime applicationDeadline;
    
    @Column(name = "positions_available")
    private Integer positionsAvailable;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
