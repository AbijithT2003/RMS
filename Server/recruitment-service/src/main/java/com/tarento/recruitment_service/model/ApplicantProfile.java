package com.tarento.recruitment_service.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;  


@Entity
@Table(name = "applicant_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicantProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "resume_url")
    private String resumeUrl;
    
    @Column(name = "current_title")
    private String currentTitle;
    
    @Column(name = "experience_years")
    private Integer experienceYears;
    
    @Column(name = "location_city")
    private String locationCity;
    
    @Column(name = "location_state")
    private String locationState;
    
    @Column(name = "location_country")
    private String locationCountry;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
