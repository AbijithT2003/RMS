package com.tarento.recruitment_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;  


@Entity
@Table(name = "applicant_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class ApplicantProfile extends AuditableEntity  {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    private String headline; // Short professional tagline

    @Column(name = "resume_url")
    private String resumeUrl;
    
    @Column(name = "current_title")
    private String currentTitle;
    
    @Column(name = "experience_years")  // changed from total_experience
private Integer experienceYears; // how should it be measured?
    
    @Column(name = "city")
    private String locationCity;

    @Column(name = "state")
    private String locationState;

    @Column(name = "country")
    private String locationCountry;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    private boolean isPublicProfile; // Indicates if the profile is public
}

/*if (candidate.isPublicProfile()) {
    // Return public fields only
} add this in controller for setting prifile public/private
 */