package com.tarento.recruitment_service.model;

import com.tarento.recruitment_service.model.enums.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.UpdateTimestamp;  

@Entity
@Table(name = "job_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id")
    private ApplicantProfile applicant;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "source_platform")
    private Platform platform;
    
    @Column(name = "source_url")
    private String sourceUrl;
    
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;
    
    @Column(name = "resume_version_url")
    private String resumeVersionUrl;
    
    @Column(name = "cover_letter", columnDefinition = "TEXT")
    private String coverLetter;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private User assignedTo;
    
    @Column(name = "screening_score")
    private Integer screeningScore;
    
    @Column(name = "screening_notes", columnDefinition = "TEXT")
    private String screeningNotes;
    
    @Column(name = "applied_at")
    private LocalDateTime appliedAt;
    
    @UpdateTimestamp
    @Column(name = "last_updated_at")
    private LocalDateTime lastUpdatedAt;
}
